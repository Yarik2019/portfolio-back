import { PortfolioCollection } from "../db/models/portfoilio.js";

export const getPortfolio = () => {
  return PortfolioCollection.find();
};

export const createPortfolio = (portfolioData) => {
  return PortfolioCollection.findOneAndUpdate(
    {userId: portfolioData.userId},
    { title: portfolioData.title, description: portfolioData.description },
    { new: true, upsert: true },
  );
};

export const updatePortfolio = (id, portfolioData) => {
  return PortfolioCollection.findByIdAndUpdate({ _id: id, userId: portfolioData.userId }, portfolioData, {
    new: true,
  });
};

export const deletePortfolio = (id, userId) => {
  return PortfolioCollection.findByIdAndDelete({ _id: id, userId });
};

export const getOnePortfolio = (id, userId) => {
  return PortfolioCollection.findOne({ _id: id, userId });
};

export const addCard = (id, cardData) => {
  return PortfolioCollection.findOneAndUpdate(
    { _id: id, userId: cardData.userId },
    {
      $push: { cards: cardData },
    },
    { new: true },
  );
};

export const updateCard = (portfolioId, cardId, cardData) => {
  const updataFields = {};

  Object.keys(cardData).forEach((key) => {
    updataFields[`cards.$.${key}`] = cardData[key];
  });

  return PortfolioCollection.findOneAndUpdate(
    {
      _id: portfolioId,
      "cards._id": cardId,
      userId: cardData.userId
    },
    { $set: updataFields },
    { new: true },
  );
};

export const getOneCard = (portfolioId, userId)=> {
  return PortfolioCollection.findOne({
    _id: portfolioId,
    userId
  });
};

export const deleteCard = (portfolioId, cardId, userId) => {
  return PortfolioCollection.findByIdAndUpdate(
    { _id: portfolioId, userId },
    {
      $pull: { cards: { _id: cardId } },
    },
    { new: true },
  );
};
