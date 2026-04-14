import { uploadToCloudinary } from "./uploadToCloudinary.js";

export const processImages = async (files) => {
  if (!files) return [];

  const fileArray = Array.isArray(files) ? files : [files];

  const urls = await Promise.all(
    fileArray.map(async (file) => {
      if (!file.mimetype.startsWith("image/")) {
        throw new Error("Invalid file type" + file.originalname);
      }

      const url = await uploadToCloudinary(file.path);
      return url;
    }),
  );

  return urls;
};
