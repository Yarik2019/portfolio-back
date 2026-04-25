import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import createHttpError from "http-errors";
import { UsersCollection } from "../db/models/user.js";
import { SessionCollection } from "../db/models/session.js";
import { THIRTY_DAY } from "../portfolio/portfolio.js";
//  ---------------------------------
export const createSession = async () => {
  const refreshToken = randomBytes(30).toString("hex");

  return {
    refreshToken,
  };
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findById(sessionId);

  if (!session) {
    throw createHttpError(404, "Session not found");
  }
  if (new Date() > session.expiresAt) {
    await SessionCollection.findByIdAndDelete(sessionId);
    throw createHttpError(401, "Session expired");
  }

  const isValid = await bcrypt.compare(refreshToken, session.refreshTokenHash);

  if (!isValid) {
    await SessionCollection.findByIdAndDelete(sessionId);
    throw createHttpError(401, "Invalid refresh token");
  }

  const newRefreshToken = randomBytes(30).toString("hex");

  session.refreshTokenHash = await bcrypt.hash(newRefreshToken, 10);
  session.expiresAt = new Date(Date.now() + THIRTY_DAY);
  await session.save();

  return {
    sessionId: session._id,
    refreshToken: newRefreshToken,
  };
};
//  ---------------------------------
export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  if (user) throw createHttpError(409, "User already exists");

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

//  ---------------------------------
export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(404, "User not found");
  }
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatch) {
    throw createHttpError(401, "Invalid password");
  }

  const { refreshToken } = await createSession();

  const session = await SessionCollection.create({
    userId: user._id,
    refreshTokenHash: await bcrypt.hash(refreshToken, 10),
    expiresAt: new Date(Date.now() + THIRTY_DAY),
  });
  return {
    sessionId: session._id,
    refreshToken,
  };
};
// -------------------------------------
export const logoutUser = async ({ sessionId }) => {
  if (!sessionId) {
    throw createHttpError(401, "No session");
  }

  await SessionCollection.findByIdAndDelete(sessionId);
};

//  ---------------------------------
export const getUser = async (user) => {
  const userData = await UsersCollection.findOne({
    _id: user._id,
  });

  if (!userData) {
    throw createHttpError(404, "User not found");
  }
  return userData;
};

//  ---------------------------------
export const updateUser = async (user, userData, options = {}) => {
  const rawResult = await UsersCollection.findOneAndUpdate(
    { _id: user._id },
    userData,
    { new: true, includeResultMetadata: true, ...options },
  );

  if (!rawResult || !rawResult.value) {
    throw createHttpError(404, "User not found");
  }

  return {
    userData: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject.upserted),
  };
};
//  ---------------------------------
export const getAllUsers = async () => {
  const usersAmount = await UsersCollection.countDocuments();

  return { usersAmount };
};
