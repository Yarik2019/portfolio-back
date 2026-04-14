import Joi from "joi";

export const cardsValidation = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(100).required(),
  demoLink: Joi.string().uri().required(),
  codeLink: Joi.string().uri().required(),
});

export const portfolioValidation = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(200).required(),
  cards: Joi.array().items(cardsValidation).default([]),
});

export const updateCardsValidation = Joi.object({
  title: Joi.string().min(2).max(100),
  description: Joi.string().min(2).max(200),
  demoLink: Joi.string().uri(),
  codeLink: Joi.string().uri(),
});

export const updatePortfolioValidation = Joi.object({
  title: Joi.string().min(2).max(100),
  description: Joi.string().min(2).max(100),
  cards: Joi.array().items(updateCardsValidation),
});
