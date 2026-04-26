import createHttpError from "http-errors";

import {
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  addCard,
  updateCard,
  getOneCard,
  deleteCard,
  getOnePortfolio,
} from "../services/portfolio.js";

import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";

export const getPortfolioController = async (req, res, next) => {
  const portfolioData = await getPortfolio();

  res.status(200).json({
    status: 200,
    message: "Portfolio data retrieved successfully",
    data: portfolioData,
  });
};

export const postPortfolioController = async (req, res, next) => {
  const portfoiloBody = req.body;
  const userId = req.user._id;
  const portfolioData = { ...portfoiloBody, userId };

  const newPortfolio = await createPortfolio(portfolioData);

  res.status(201).json({
    status: 201,
    message: "Portfolio created successfully",
    data: newPortfolio,
  });
};

export const patchPortfolioController = async (req, res, next) => {
  const portfoilioId = req.params.id;
  const userId = req.user._id;
  const updatePortfolioData = req.body;
  const portfolioUpdateData = { ...updatePortfolioData, userId };

  const updatedPortfolio = await updatePortfolio(
    portfoilioId,
    portfolioUpdateData,
  );

  res.status(200).json({
    status: 200,
    message: "Portfolio updated successfully",
    data: updatedPortfolio,
  });
};

export const deletePortfolioController = async (req, res, next) => {
  const portfoilioId = req.params.id;
  const userId = req.user._id;
  const existing = await deletePortfolio(portfoilioId, userId);

  if (existing.image?.publicId) {
    await deleteFromCloudinary(existing.image.publicId);
  }

  if (!existing) {
    throw createHttpError(404, "Portfolio not found");
  }

  res.sendStatus(204);
};

export const postCardController = async (req, res, next) => {
  const portfoilioId = req.params.id;
  const userId = req.user._id;
  const cardBody = req.body;
  const file = req.file;

  let imageUrl = null;

  if (file) {
    const uploadResult = await uploadToCloudinary(file.path);
    imageUrl = {
      url: uploadResult.url,
      publicId: uploadResult.publicId,
    };
  }

  const cardData = { ...cardBody, userId, image: imageUrl };

  const dataCard = await addCard(portfoilioId, cardData);
  res.status(201).json({
    status: 201,
    message: "Card added successfully",
    data: dataCard,
  });
};

export const patchCardController = async (req, res, next) => {
  const portfoilioId = req.params.id;
  const cardId = req.params.cardId;
  const userId = req.user._id;
  const updateCardBody = req.body;
  const file = req.file;

  const existingPortfolio = await getOnePortfolio(portfoilioId, userId);

  let imageUrl = existingPortfolio.image;

  if (file) {
    const uploadResult = await uploadToCloudinary(file.path);
    imageUrl = {
      url: uploadResult.url,
      publicId: uploadResult.publicId,
    };

    if (existingPortfolio.image?.publicId) {
      await deleteFromCloudinary(existingPortfolio.image.publicId);
    }
  }

  const updatedCardData = {
    ...updateCardBody,
    userId,
    image: file ? imageUrl : existingPortfolio.image,
  };

  const updatedCard = await updateCard(portfoilioId, cardId, updatedCardData);

  res.status(200).json({
    status: 200,
    message: "Card updated successfully",
    data: updatedCard,
  });
};

export const deleteCardController = async (req, res, next) => {
  const portfoilioId = req.params.id;
  const cardId = req.params.cardId;
  const userId = req.user._id;

  const portfoilioOneCard = await getOneCard(portfoilioId, userId);
  const existingCard = portfoilioOneCard.cards.id(cardId);
  const publicId = existingCard.image?.publicId;

  if (publicId) {
    try {
      await deleteFromCloudinary(publicId);
    } catch (error) {
      console.error("Cloudinary delete error:", error.message);
    }
  }

  const portfoilioOneCardDeleted = await deleteCard(
    portfoilioId,
    cardId,
    userId,
  );

  if (!portfoilioOneCardDeleted) {
    throw createHttpError(404, "Portfolio not found");
  }
  res.sendStatus(204);
};
