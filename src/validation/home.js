import Joi from "joi";

export const homeValidation = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(300).required(),
  link: Joi.string().uri().required(),
  image: Joi.object({
    url: Joi.string().uri().optional(),
    publicId: Joi.string().optional()
  }).optional(),
});

export const updateHomeValidation = Joi.object({
  title: Joi.string().min(2).max(100),
  description: Joi.string().min(2).max(300),
  link: Joi.string().uri(),
  image: Joi.object({
    url: Joi.string().uri().optional(),
    publicId: Joi.string().optional()
  }).optional(),
});
