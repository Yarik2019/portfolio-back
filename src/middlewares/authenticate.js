import createHttpError from "http-errors";

import { SessionCollection } from "../db/models/session.js";
import { UsersCollection } from "../db/models/user.js";

export const authentication = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      next(createHttpError(401, "Authorization header is missing"));
      return;
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      next(createHttpError(401, "Auth header should be of type Bearer"));
      return;
    }

    const session = await SessionCollection.findOne({ accessToken: token });

    if (!session) {
      next(createHttpError(401, "Session not found"));
      return;
    }

    const isAccessTokenExpired =
      new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
      next(createHttpError(401, "Access token has expired"));
      return;
    }

    const user = await UsersCollection.findById(session.userId);

    if (!user) {
      next(createHttpError(401, "User not found"));
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
