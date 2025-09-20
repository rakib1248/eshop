import slugify from "slugify";
import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary";


dotenv.config()
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Image upload on cloudinary
 *
 */

export const cloudImgUpload = async ({ file, filename, cloudName, preset }) => {
  const formData = new FormData();

  // ✅ Buffer + filename পাঠানো
  formData.append("file", file, filename);
  formData.append("upload_preset", preset);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData,
    { headers: formData.getHeaders() } // important
  );

  return response.data; // secure_url, public_id
};
// create slug
export function createSlug(text) {
  return slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}

// cloudeImage Delete
export const deleteCloudImage = async (publicId) => {
 
    if (publicId) {
       await cloudinary.uploader.destroy(publicId, {
         invalidate: true,
       });

}
  
 

 
};
