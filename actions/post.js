"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { uploadFile } from "./uploadFile";
import { revalidatePath } from "next/cache";
import { checkPostForTrends } from "@/utils";

export const createPost = async (post) => {
  const { postText, media } = post;
  try {
    let cld_id;
    let assetUrl;
    const user = await currentUser();
    if (media) {
      const res = await uploadFile(media, `/posts/${user?.id}`);
      const { public_id, secure_url } = res;
      cld_id = public_id;
      assetUrl = secure_url;
    }
    const newPost = await db.post.create({
      data: {
        postText,
        media: assetUrl,
        cld_id,
        author: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    const trends = checkPostForTrends(postText);
    if (trends.length > 0) {
      createTrends(trends, newPost.id);
    }

    return {
      data: newPost,
    };
  } catch (e) {
    console.log(e);
    throw Error("Failed to create post");
  }
};

export const getPosts = async (lastCursor) => {
  try {
    // const { id: userId } = await currentUser();
    const take = 5;
    const posts = await db.post.findMany({
      include: {
        author: true,
        likes: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
      take,
      ...(lastCursor && {
        skip: 1,
        cursor: {
          id: lastCursor,
        },
      }),
      orderBy: {
        createdAt: "desc",
      },
    });

    if (posts.length === 0) {
      return {
        data: [],
        metaData: {
          lastCursor: null,
          hasMore: false,
        },
      };
    }
    const lastPostInResults = posts[posts.length - 1];
    const cursor = lastPostInResults?.id;

    const morePosts = await db.post.findMany({
      take,
      skip: 1,
      cursor: {
        id: cursor,
      },
    });
    return {
      data: posts,
      metaData: {
        lastCursor: cursor,
        hasMore: morePosts.length > 0,
      },
    };
  } catch (e) {
    console.log(e);
    throw Error("Failed to fetch posts");
  }
};

export const updatePostLike = async (postId, type) => {
  // type is either "like" or "unlike"
  try {
    const { id: userId } = await currentUser();

    // find the post in db
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        likes: true,
      },
    });
    if (!post) {
      return {
        error: "Post not found",
      };
    }

    // check if user has already liked the post
    const like = post.likes.find((like) => like.authorId === userId);

    // if user has already liked the post,
    if (like) {
      // if user is trying to like the post again, return the post
      if (type === "like") {
        return {
          data: post,
        };
      }
      // otherwise, delete the like
      else {
        await db.like.delete({
          where: {
            id: like.id,
          },
        });
        console.log("like deleted");
      }
    }
    // if user has not already liked the post
    else {
      // if user is trying to unlike the post, return the post
      if (type === "unlike") {
        return {
          data: post,
        };
      }
      // if user is trying to like the post, create a new like
      else {
        await db.like.create({
          data: {
            post: {
              connect: {
                id: postId,
              },
            },
            author: {
              connect: {
                id: userId,
              },
            },
          },
        });
        console.log("like created");
      }
    }
    const updatedPost = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        likes: true,
      },
    });
    return {
      data: updatedPost,
    };
  } catch (e) {
    console.log(e);
    throw Error("Failed to update post like");
  }
};

export const addComment = async (postId, comment) => {
  try {
    const { id: userId } = await currentUser();
    const newComment = await db.comment.create({
      data: {
        comment,
        post: {
          connect: {
            id: postId,
          },
        },
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
    console.log("comment created", newComment);
    return {
      data: newComment,
    };
  } catch (e) {
    throw e;
  }
};

export const createTrends = async (trends, postId) => {
  try {
    const newTrends = await db.trend.createMany({
      data: trends.map((trend) => ({
        name: trend,
        postId: postId,
      })),
    });
    return {
      data: newTrends,
    };
  } catch (e) {
    throw e;
  }
};

export const getPopularTrends = async () => {
  try {
    const trends = await db.trend.groupBy({
      by: ["name"],
      _count: {
        name: true,
      },
      orderBy: {
        _count: {
          name: "desc",
        },
      },
      take: 3,
    });
    console.log("trends", trends);
    return {
      data: trends,
    };
  } catch (e) {
    throw e;
  }
};
