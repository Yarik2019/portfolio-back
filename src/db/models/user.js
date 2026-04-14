import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

userSchema.pre("findOneAndUpdate", function (next) {
  if (this._update.name === "null") {
    this._update.name = null;
  }
  next();
});

userSchema.method.toJSON =  function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model("users", userSchema);
