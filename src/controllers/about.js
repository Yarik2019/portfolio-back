import createHttpError from "http-errors";
import {
  getAbout,
  postAbout,
  deleteAbout,
  patchAbout,
} from "../services/about.js";

export const getAboutController = async (req, res) => {
  const about = await getAbout();
  res.status(200).json({
    status: 200,
    message: "Successfully fetched about",
    data: about,
  });
};

export const postAboutController = async (req, res) => {
  const dataBody = req.body;
  const dataHome = {
    ...dataBody,
    userId: req.user._id
  };
  const newAbout = await postAbout(dataHome);

  res.status(201).json({
    status: 201,
    message: "About created successfully",
    data: newAbout,
  });
};

export const deleteAboutController = async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  const deletedAbout = await deleteAbout(id, userId);

  if (!deletedAbout) {
    throw createHttpError(404, "About not found");
  }
  res.sendStatus(204);
};

export const patchAboutController = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const dataHome = {
    ...updatedData,
    userId: req.user._id,
  };
  const updatedAbout = await patchAbout(id, dataHome);

  res.status(200).json({
    status: 200,
    message: "About updated successfully",
    data: updatedAbout,
  });
};
