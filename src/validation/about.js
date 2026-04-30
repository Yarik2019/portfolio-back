import Joi from "joi";

export const aboutValidation = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  subTitle: Joi.string().min(2).max(2000).required(),
  description: Joi.string().min(10).max(2000).required()
}); 

export const updateAboutValidation = Joi.object({
  title: Joi.string().min(2).max(100),
  subTitle: Joi.string().min(2).max(2000),
  description: Joi.string().min(10).max(2000)
});