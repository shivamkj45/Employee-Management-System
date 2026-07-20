import cloudinary from "../config/cloudinary";

export const uploadImage = async (
  fileBuffer: Buffer,
  folder: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result!.secure_url);
      }
    );

    stream.end(fileBuffer);
  });
};

export const deleteImage = async (
  imageUrl: string
): Promise<void> => {

  if (!imageUrl) return;

  try {

    const urlParts = imageUrl.split("/");

    const fileName =
      urlParts[urlParts.length - 1];

    const publicId =
      `employee-profile/${fileName.split(".")[0]}`;

    await cloudinary.uploader.destroy(publicId);

  } catch (error) {

    console.error("Cloudinary delete failed:", error);

  }

};