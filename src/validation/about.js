import Joi from "joi";

export const aboutValidation = Joi.object({
  title: Joi.string().min(2).max(300).required(),
  subTitle: Joi.string().min(2).max(3000).required(),
  description: Joi.string().min(10).max(3000).required()
}); 

export const updateAboutValidation = Joi.object({
  title: Joi.string().min(2).max(300),
  subTitle: Joi.string().min(2).max(3000),
  description: Joi.string().min(10).max(3000)
});