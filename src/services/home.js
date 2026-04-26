import createHttpError from "http-errors";
import { HomeCollection } from "../db/models/home.js";

export const getHome =() => {
  return HomeCollection.find();
};

export const getHomeById = async (id) => {
  return await HomeCollection.findById(id).lean();
};

export const postHome = async (homeData) => {
  const existing = await HomeCollection.findOne({ userId: homeData.userId });

  if (existing) {
    throw createHttpError(409, "Home already exists");
  }

  return HomeCollection.create(homeData);
};

export const updateHome = (id, updateData) => {
  return HomeCollection.findByIdAndUpdate(
    { _id: id, userId: updateData.userId },
    updateData,
    {
      new: true,
    },
  );
};

export const deleteHome = (id, userId) => {
  return HomeCollection.findByIdAndDelete({ _id: id, userId });
};
