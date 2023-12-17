"use server";
import { cld } from "@/lib/cloudinary";

export const uploadFile = async (file, folder) => {
  try {
    // Upload image to Cloudinary
    const res = cld.v2.uploader.upload(
      file,
      { folder: `socialhop/${folder}`, resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("Error uploading image:", error);
        } else {
          console.log("file uploaded successfully");
          return result;
        }
      }
    );
    return res;
  } catch (e) {
    console.log(e);
    return {
      error: "Failed to upload",
    };
  }
};
