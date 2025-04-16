import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

type UploadResult =
    | {
          secure_url: string;
      }
    | undefined;

export const uploadImage = async (buffer: Buffer): Promise<UploadResult> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ folder: "calendar-art" }, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            })
            .end(buffer);
    });
};
