import cloudinary from "cloudinary";

import { env } from "./env.js";
import { CLOUDINARY } from "../portfolio/portfolio.js";
import createHttpError from "http-errors";

cloudinary.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export const deleteFromCloudinary = async (publicId) => {
  const result = await cloudinary.uploader.destroy(publicId);
  if (result.result !== "ok" && result.result !== "not_found") {
    throw createHttpError(204, "Cloudinary delete error");
  }
  return result;
};
