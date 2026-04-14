import Joi from "joi";
export const cardValidation = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  name: Joi.string().min(2).max(50).required(),
  styles: Joi.string().min(2).max(100).required(),
});

export const experienceValidation = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(200).required(),
  card: Joi.array().items(cardValidation),
});

export const updateCardValidation = Joi.object({
  title: Joi.string().min(2).max(100),
  name: Joi.string().min(2).max(50),
  styles: Joi.string().min(2).max(100),
});

export const updateExperienceValidation = Joi.object({
  title: Joi.string().min(2).max(100),
  description: Joi.string().min(2).max(200),
  card: Joi.array().items(updateCardValidation),
});
