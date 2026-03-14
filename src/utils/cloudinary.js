import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const cloudinaryInstance = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: "auto",
            },
        );

        if (!cloudinaryInstance.url) {
            throw new ApiError(
                500,
                "Internal Server Error: failed to get the resource url from the cloudinary",
            );
        }

        fs.unlinkSync(localFilePath);

        return cloudinaryInstance;
    } catch (err) {
        fs.unlinkSync(localFilePath);
        console.error("Internal Server Error: Failed to upload the resource to the cloudinary")

        return null;
    }
};

export { uploadToCloudinary };
