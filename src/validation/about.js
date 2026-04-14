import Joi from "joi";

export const aboutValidation = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  subTitle: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).max(200).required()
}); 

export const updateAboutValidation = Joi.object({
  title: Joi.string().min(2).max(100),
  subTitle: Joi.string().min(2).max(100),
  description: Joi.string().min(10).max(200)
});