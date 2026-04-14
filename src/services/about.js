import createHttpError from "http-errors";
import { AboutCollection } from "../db/models/about.js";

export const getAbout = () => {
  return AboutCollection.find();
};

export const postAbout = async (aboutData) => {
  const existing = await AboutCollection.findOne({ userId: aboutData.userId });
   if(existing){
    throw createHttpError(400, 'About already exists');
   }

   return AboutCollection.create(aboutData);
};
  
export const patchAbout = (id, updatedData) => {
  return AboutCollection.findOneAndUpdate({ _id: id, userId: updatedData.userId }, updatedData, { new: true });
};

export const deleteAbout = (id, userId) => {
  return AboutCollection.findOneAndDelete({ _id: id, userId });
};
