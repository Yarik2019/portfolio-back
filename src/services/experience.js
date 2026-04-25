import { ExperienceCollection } from "../db/models/experience.js";

export const getExperiences = () => {
  return ExperienceCollection.find();
};

export const createExperience = (experienceData) => {
  return ExperienceCollection.findOneAndUpdate(
    { userId: experienceData.userId },
    {
      title: experienceData.title,
      description: experienceData.description,
    },
    {
      new: true,
      upsert: true,
    },
  );
};

export const updateExperience = (id, experienceData) => {
  return ExperienceCollection.findByIdAndUpdate(
    { _id: id, userId: experienceData.userId },
    experienceData,
    {
      new: true,
    },
  );
};

export const deleteExperience = (id, userId) => {
  return ExperienceCollection.findByIdAndDelete({ _id: id, userId });
};

export const addCard = (id, cardData) => {
  return ExperienceCollection.findOneAndUpdate(
    { _id: id, userId: cardData.userId },
    {
      $push: { cards: cardData },
    },
    { new: true },
  );
};

export const updateCard = (experienceId, cardId, cardData) => {
  const updataFields = {};

  Object.keys(cardData).forEach((key) => {
    updataFields[`cards.$.${key}`] = cardData[key];
  });
  return ExperienceCollection.findOneAndUpdate(
    { _id: experienceId, "cards._id": cardId, userId: cardData.userId },
    { $set: updataFields },
    { new: true },
  );
};
export const getOneCard = (portfolioId, userId) => {
  return ExperienceCollection.findOne({
    _id: portfolioId,
    userId,
  });
};
export const deleteCard = (experienceId, cardId, userId) => {
  return ExperienceCollection.findByIdAndUpdate(
    { _id: experienceId, userId },
    {
      $pull: { cards: { _id: cardId } },
    },
    { new: true },
  );
};
