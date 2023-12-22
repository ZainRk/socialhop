"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { uploadFile } from "./uploadFile";
import { revalidatePath } from "next/cache";

export const createPost = async (post) => {
  const { postText, media } = post;
  try {
    let cld_id;
    let assetUrl;
    const user = await currentUser();
    if (media) {
      const res = await uploadFile(media, `/posts/${user?.id}`);
      const { public_id, url } = res;
      cld_id = public_id;
      assetUrl = url;
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
    return {
      data: newPost,
    };
  } catch (e) {
    console.log(e);
    return {
      error: "Failed to save new post in db",
    };
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
      return (
        {
          data: [],
          metaData: {
            lastCursor: null,
            hasMore: false,
          },
        },
        { status: 200 }
      );
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
    return (
      {
        error: "Failed to get posts",
      },
      { status: 400 }
    );
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
    return {
      error: "Failed to update post like",
    };
  }

  revalidatePath('/')
};
