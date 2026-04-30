import mongoose ,{ Schema, model } from "mongoose";
const contactSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);
export const SocialCollection = model("Social", contactSchema);
