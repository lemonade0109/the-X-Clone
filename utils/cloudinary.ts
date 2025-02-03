import { v2 as cloudinary } from "cloudinary";

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error("CLOUDINARY_CLOUD_NAME is not set");
}

if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error("CLOUDINARY_API_KEY is not set");
}

if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error("CLOUDINARY_API_SECRET is not set");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(image: File | undefined) {
  try {
    const imageData = await image?.arrayBuffer();
    const mime = image?.type;
    const encoding = "base64";
    const base64Data = Buffer.from(imageData!).toString("base64");
    // const fileUri = `data:${mime};base64,${base64Data}`;
    const fileUri = `data:${mime};${encoding},${base64Data}`;
    const result = await cloudinary.uploader.upload(fileUri, {
      folder: "x-clone-app-mutations",
    });
    return result.secure_url;
  } catch (error) {
    console.log(error);
  }
}

// import axios from "axios";

// const uploadImage = async (file: File) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "your_upload_preset");

//   const response = await axios.post(
//     "https://api.cloudinary.com/v1_1/dabrk5g43/image/upload",
//     formData
//   );

//   return response.data.secure_url;
// };
