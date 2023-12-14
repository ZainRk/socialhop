"use server";

import { db } from "@/lib/db";

export const createUser = async (user) => {
  const { id, first_name, last_name, email_address, image_url } = user;
  try {
    const userExists = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (userExists) {
      return;
    }
    await db.user.create({
      data: {
        id,
        first_name,
        last_name,
        email_address,
        image_url,
      },
    });
  } catch (e) {
    console.log(e);
    return {
      error: "Failed to save new user in db",
    };
  }

  console.log("User created in supabase");
};


export const updateUser = async (user) => {
  const { id, first_name, last_name, email_address, image_url } = user;
  try {
    await db.user.update({
      where: {
        id,
      },
      data: {
        first_name,
        last_name,
        email_address,
        image_url,
      },
    });
  } catch (e) {
    console.log(e);
    return {
      error: "Failed to update user in db",
    };
  }

  console.log("User updated in supabase");
}