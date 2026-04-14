import createHttpError from "http-errors";
import { ContactCollection } from "../db/models/contact.js";

export const getContact = () => {
  return ContactCollection.find();
};

export const createContact = async (contactData) => {
  const existing = await ContactCollection.findOne({ userId: contactData.userId });

  if (existing) {
    throw createHttpError(409, "Contact already exists");
  }

  return ContactCollection.create(contactData);
};

export const updateContact = (id, contactData) => {
  return ContactCollection.findByIdAndUpdate({ _id: id, userId: contactData.userId }, contactData, {
    new: true,
  });
};

export const deleteContact = (id, userId) => {
  return ContactCollection.findByIdAndDelete({ _id: id, userId });
};
