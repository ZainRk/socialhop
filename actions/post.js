"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { uploadFile } from "./uploadFile";

export const createPost = async (post) => {
  const { postText, media } = post;
  try {
    const user = await currentUser();
    if (media) {
      const res = await uploadFile(media, `/posts/${user?.id}`);
      console.log(res)
      const { public_id: img_public_id, url } = res;
    }
    const newPost = await db.post.create({
      data: {
        postText,
        media: "this is media",
        author: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    console.log("New post created in db", newPost);
  } catch (e) {
    console.log(e);
    return {
      error: "Failed to save new post in db",
    };
  }
};
