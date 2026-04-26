import { ContactCollection } from "../db/models/contact.js";

export const getContact = () => {
  return ContactCollection.find();
};

export const createContact = async (contactData) => {
  return await ContactCollection.create({
    userId: contactData.userId,
    ...contactData,
  });
};

export const updateContact = (id, contactData) => {
  return ContactCollection.findByIdAndUpdate(
    { _id: id, userId: contactData.userId },
    contactData,
    {
      new: true,
    },
  );
};

export const deleteContact = (id, userId) => {
  return ContactCollection.findByIdAndDelete({ _id: id, userId });
};
