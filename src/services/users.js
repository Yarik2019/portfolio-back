import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import createHttpError from "http-errors";
import { UsersCollection } from "../db/models/user.js";
import { SessionCollection } from "../db/models/session.js";
import { TWO_HOURS, THIRTY_DAY } from "../portfolio/portfolio.js";
//  ---------------------------------
export const createSession = async () => {
  const accessToken = randomBytes(30).toString("base64");
  const refreshToken = randomBytes(30).toString("base64");

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + TWO_HOURS),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY),
  };
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken: refreshToken,
  });

  if (!session) {
    throw createHttpError(404, "Authentication failed. Session not found");
  }

  const isSessionTokenEpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenEpired) {
    throw createHttpError(404, "Authentication failed. Session not found");
  }

  session.accessToken = randomBytes(30).toString("base64");
  session.refreshToken = randomBytes(30).toString("base64");
  session.accessTokenValidUntil = new Date(Date.now() + TWO_HOURS);
  session.refreshTokenValidUntil = new Date(Date.now() + THIRTY_DAY);

  await session.save();

  return session;
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
    throw createHttpError(404, "Authentication failed. No such user exists");
  }
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatch) {
    throw createHttpError(401, "Authentication failed. Invalid password");
  }

  const newSession = await createSession();
  return await SessionCollection.create({ userId: user._id, ...newSession });
};
// -------------------------------------
export const logoutUser = async (cookies) => {
  const { sessionId, refreshToken, accessToken } = cookies;

  if (!sessionId || !refreshToken || !accessToken) {
    throw createHttpError(401, "Authentication failed. Session not found");
  }

  await SessionCollection.deleteOne({
    _id: sessionId,
    refreshToken,
    accessToken,
  });
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
  const usersQuery = await UsersCollection.find();

  const usersCount = await UsersCollection.find()
    .merge(usersQuery)
    .countDocuments();

  return {
    usersAmount: usersCount,
  };
};
