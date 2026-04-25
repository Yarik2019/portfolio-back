import createHttpError from "http-errors";

import { SessionCollection } from "../db/models/session.js";
import { UsersCollection } from "../db/models/user.js";

export const authentication = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return next(createHttpError(401, "Access token is missing"));
    }

    const session = await SessionCollection.findOne({
      accessToken: accessToken,
    });

    if (!session) {
      return next(createHttpError(401, "Session not found"));
    }
    const isAccessTokenExpired =
      new Date() > new Date(session.accessTokenValidUntil);
    if (isAccessTokenExpired) {
      return next(createHttpError(401, "Access token has expired"));
    }

    const user = await UsersCollection.findById(session.userId);

    if (!user) {
      return next(createHttpError(401, "User not found"));
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
