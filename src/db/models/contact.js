import { Schema, model } from "mongoose";

const contactSchema = new Schema(
  {
    name: String ,
    email: String,
    message: String,
    token: String,
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

export const ContactCollection = model("Contact", contactSchema);
