import createHttpError from "http-errors";

import {
  getSocial,
  createSocial,
  updateSocial,
  deleteSocial,
} from "../services/social.js";

export const getSocialController = async (req, res, next) => {
  const socials = await getSocial();

  res.status(200).json({
    status: 200,
    message: "Socials retrieved successfully",
    data: socials,
  });
};

export const createSocialController = async (req, res, next) => {
  const socialBody = req.body;
  const userId = req.user._id;

  const socialData = {
    ...socialBody,
    userId: userId
  };
  const createdSocial = await createSocial(socialData);

  res.status(201).json({
    status: 201,
    message: "Social created successfully",
    data: createdSocial
  }); 
};

export const patchSocialController = async (req, res, next) => {
  const socialId = req.params.id;
  const userId = req.user._id;
  const updateData = req.body;
  const socialData = { ...updateData, userId };
  const updatedSocial = await updateSocial(socialId, socialData);
  res.status(200).json({
    status: 200,
    message: "Social updated successfully",
    data: updatedSocial,
  });
};

export const deleteSocialController = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user._id;
  const deleteData = await deleteSocial(id, userId);

  if (!deleteData) {
    throw createHttpError(404, "Social not found");
  }

  res.sendStatus(204);
};
