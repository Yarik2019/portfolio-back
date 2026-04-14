import createHttpError from "http-errors";

import {
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from "../services/contact.js";

export const getContactsController = async (req, res, next) => {
  const contacts = await getContact();

  res.status(200).json({
    status: 200,
    message: "Contacts retrieved successfully",
    data: contacts,
  });
};

export const createContactController = async (req, res, next) => {
  const contactBody = req.body;
  const userId = req.user._id;

  const contactData = {
    ...contactBody,
    userId: userId
  };
  const createdContact = await createContact(contactData);

  res.status(201).json({
    status: 201,
    message: "Contact created successfully",
    data: createdContact,
  });
};

export const patchContactController = async (req, res, next) => {
  const contactId = req.params.id;
  const userId = req.user._id;
  const updateData = req.body;
  const contactData = { ...updateData, userId };
  const updatedContact = await updateContact(contactId, contactData);

  res.status(200).json({
    status: 200,
    message: "Contact updated successfully",
    data: updatedContact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user._id;
  const deleteData = await deleteContact(id, userId);

  if (!deleteData) {
    throw createHttpError(404, "Contact not found");
  }

  res.sendStatus(204);
};
