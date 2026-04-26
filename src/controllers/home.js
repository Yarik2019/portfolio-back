import createHttpError from "http-errors";

import { getHome, getHomeById, postHome, updateHome, deleteHome } from "../services/home.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";

export const getHomeController = async (req, res, next) => {
  const dataHome = await getHome();

  res.status(200).json({
    status: 200,
    message: "Home data retrieved successfully",
    data: dataHome,
  });
};

export const createHomeController = async (req, res, next) => {
  const dataBody = req.body;
  const userId = req.user._id;
  const file = req.file;
  let imageUrl = null;

  if (file) {
    const uploadResult = await uploadToCloudinary(file.path);
    imageUrl = {
      url: uploadResult.url,
      publicId: uploadResult.publicId,
    };
  }

  const homeData = { ...dataBody, userId, image: imageUrl };

  const dataHome = await postHome(homeData);

  res.status(201).json({
    status: 201,
    message: "Home data updated successfully",
    data: dataHome,
  });
};

export const updateHomeController = async (req, res, next) => {
  const homeId = req.params.id;
  const updateData = req.body;
  const userId = req.user._id;
  const file = req.file;

  const existingHome = await getHomeById(homeId);

  if (!existingHome) {
    throw createHttpError(404, "Home data not found");
  }

  let imageUrl = existingHome.image;

  if (file) {
    const uploadResult = await uploadToCloudinary(file.path);
    imageUrl = {
      url: uploadResult.url,
      publicId: uploadResult.publicId,
    };

    if(existingHome.image?.publicId) {
      await deleteFromCloudinary(existingHome.image.publicId);
    }
  }


  const homeUpdateData = {...updateData, userId, image: file ? imageUrl : existingHome.image };

  const dataHome = await updateHome(homeId, homeUpdateData, { new: true });

  res.status(201).json({
    status: 201,
    message: "Home data updated successfully",
    data: dataHome,
  });
};

export const deleteHomeController = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user._id;
  const deleteData = await deleteHome(id, userId);

  if (deleteData.image?.publicId) {
    await deleteFromCloudinary(deleteData.image.publicId);
  }

  if (!deleteData) {
    throw createHttpError(404, "Home data not found");
  }

  res.sendStatus(204);
};
