import createHttpError from "http-errors";

import { SessionCollection } from "../db/models/session.js";
import { UsersCollection } from "../db/models/user.js";

export const authentication = async (req, res, next) => {
  try {
    const { sessionId } = req.cookies;

    if (!sessionId) {
      return next(createHttpError(401, "No Session"));
    }

    const session = await SessionCollection.findById(sessionId).lean();

    if (!session) {
      return next(createHttpError(401, "Session not found"));
    }

    if (new Date() > session.expiresAt) {
      await SessionCollection.findByIdAndDelete(sessionId);
      return next(createHttpError(401, "Session expired"));
    }

    const user = await UsersCollection.findById(session.userId).select(
      "-password",
    );

    if (!user) {
      return next(createHttpError(401, "User not found"));
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
