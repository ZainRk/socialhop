import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
  // cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  // api_key: process.env.NEXT_PUBLIC_CLD_API_KEY,
  // api_secret: process.env.NEXT_PUBLIC_CLD_API_SECR,
  cloud_name: "dcdhklrjc",
  api_key: "119385592224276",
  api_secret: "NfzKugKwvfkLGjpvWZ-_Gj9G8HU",
});

export const cld = globalThis.cloudinary || cloudinary;

if (process.env.NODE_ENV !== "production") globalThis.cloudinary = cld;
