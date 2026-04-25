import createHttpError from "http-errors";

import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  addCard,
  updateCard,
  deleteCard,
  getOneCard,
} from "../services/experience.js";

import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";

export const getExperiencesController = async (req, res, next) => {
  const dataExperiences = await getExperiences();

  res.status(200).json({
    status: 200,
    message: "Experiences retrieved successfully",
    data: dataExperiences,
  });
};

export const postExperienceController = async (req, res, next) => {
  const dataBody = req.body;
  const userId = req.user._id;

  const experienceData = { ...dataBody, userId };
  const dataExperience = await createExperience(experienceData);

  res.status(201).json({
    status: 201,
    message: "Experience created successfully",
    data: dataExperience,
  });
};

export const patchExperienceController = async (req, res, next) => {
  const experienceId = req.params.id;
  const userId = req.user._id;
  const dataBody = req.body;
  const updateData = { ...dataBody, userId };
  const dataExperience = await updateExperience(experienceId, updateData);

  res.status(200).json({
    status: 200,
    message: "Experience updated successfully",
    data: dataExperience,
  });
};

export const deleteExperienceController = async (req, res, next) => {
  const experienceId = req.params.id;
  const userId = req.user._id;

  const deleteData = await deleteExperience(experienceId, userId);
  if (deleteData.image?.publicId) {
    await deleteFromCloudinary(deleteData.image.publicId);
  }
  if (!deleteData) {
    throw createHttpError(404, "Experience not found");
  }
  res.sendStatus(204);
};

export const postCardController = async (req, res, next) => {
  const experienceId = req.params.id;
  const userId = req.user._id;
  const dataBody = req.body;
  const file = req.file;
  let imageUrl = null;

  if (file) {
    const uploadResult = await uploadToCloudinary(file.path);

    imageUrl = {
      url: uploadResult.url,
      publicId: uploadResult.publicId,
    };
  }
  const cardData = { ...dataBody, userId, image: imageUrl };
  const dataCard = await addCard(experienceId, cardData);

  res.status(201).json({
    status: 201,
    message: "Card added successfully",
    data: dataCard,
  });
};

export const updateCardController = async (req, res, next) => {
  const experienceId = req.params.id;
  const cardId = req.params.cardId;
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
  const updateData = { ...dataBody, userId, image: imageUrl };
  const dataCard = await updateCard(experienceId, cardId, updateData);
 console.log(dataCard);
  res.status(200).json({
    status: 200,
    message: "Card updated successfully",
    data: dataCard,
  });
};

export const deleteCardController = async (req, res, next) => {
  const experienceId = req.params.id;
  const cardId = req.params.cardId;
  const userId = req.user._id;

  const experienceOneCard = await getOneCard(experienceId, userId);

  const existingCard = experienceOneCard.cards.id(cardId);

  const publicId = existingCard.image?.publicId;

  if (publicId) {
    try {
      await deleteFromCloudinary(publicId);
    } catch (error) {
      console.error("Cloudinary delete error:", error.message);
    }
  }

  const deleteData = await deleteCard(experienceId, cardId, userId);

  if (!deleteData) {
    throw createHttpError(404, "Card not found");
  }
  res.sendStatus(204);
};
