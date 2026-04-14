import mongoose, { Schema, model } from "mongoose";
const cardsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  styles: {
    type: String,
    required: true,
  },
  image: {
    url: { type: String, required: false },
    publicId: { type: String, required: false },
  },
});

const experienceSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    cards: [cardsSchema],
  },
  { timestamps: true, versionKey: false },
);

export const ExperienceCollection = model("Experience", experienceSchema);
