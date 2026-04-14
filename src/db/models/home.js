import mongoose, { Schema, model } from "mongoose";
const homeSchema = new Schema(
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
    link: {
      type: String,
      required: true,
    },
    image: {
      url: { type: String, required: false },
      publicId: { type: String, required: false },
    },
  },
  { timestamps: true, versionKey: false },
);

export const HomeCollection = model("Home", homeSchema);
