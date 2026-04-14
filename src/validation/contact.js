import Joi from "joi";

export const contactValidation = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  icon: Joi.string().min(2).max(100).required(),
  link:  Joi.string().min(2).max(100).required(),
});

export const updateContactValidation = Joi.object({
  name: Joi.string().min(2).max(100),
  icon: Joi.string().min(2).max(100),
  link:  Joi.string().min(2).max(100),
});