import mongoose, { Schema, model } from "mongoose";
const CardsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  demoLink: {
    type: String,
    required: true,
  },
  codeLink: {
    type: String,
    required: true,
  },
  image: {
    url: { type: String, required: false },
    publicId: { type: String, required: false },
  },
});

const portfolioSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cards: [CardsSchema],
  },
  { timestamps: true, versionKey: false },
);

export const PortfolioCollection = model("Portfolio", portfolioSchema);
