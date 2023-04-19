import cloudinary from "cloudinary";

// cấu hình địa chỉ cloudinary_url
cloudinary.config({
  cloud_name: "your_cloud_name",
  api_key: "your_api_key",
  api_secret: "your_api_secret",
});

const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.v2.api.delete_resources(publicId);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Could not delete image from Cloudinary");
  }
};

export default deleteImage;
