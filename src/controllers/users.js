import { THIRTY_DAY, TWO_HOURS } from "../portfolio/portfolio.js";

import {
  getUser,
  getAllUsers,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  refreshUserSession,
} from "../services/users.js";

export const registerUserController = async (req, res, next) => {
  const userBody = req.body;
  const user = await registerUser(userBody);

  res.status(201).json({
    status: 201,
    message: "User registered successfully",
    data: { email: user.email },
  });
};

export const loginUserController = async (req, res, next) => {
  const userData = req.body;
  const session = await loginUser(userData);

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(Date.now() + THIRTY_DAY),
  });
  res.cookie("accessToken", session.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(Date.now() + TWO_HOURS),
  });
  res.cookie("sessionId", session._id, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(Date.now() + THIRTY_DAY),
  });

  res.status(200).json({
    status: 200,
    message: "User logged in successfully",
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res, next) => {
  await logoutUser(req.cookies);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });
  res.clearCookie("sessionId", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  });

  res.status(204).end();
};

export const getUserController = async (req, res, next) => {
  const user = req.user;
  const userData = await getUser(user);

  res.status(200).json({
    status: 200,
    message: "User fetched successfully",
    data: userData,
  });
};

export const setupSession = async (res, session) => {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(Date.now() + THIRTY_DAY),
  });

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(Date.now() + THIRTY_DAY),
  });
};

export const refreshTokenController = async (req, res) => {
  const session = await refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: "Session refreshed successfully",
    data: { accessToken: session.accessToken },
  });
};

export const updateUserController = async (req, res) => {
  const { user } = req;

  const result = await updateUser(user, req.body);

  res.status(200).json({
    status: 200,
    message: "User updated successfully",
    data: result.userData,
  });
};

export const getAllUserController = async (req, res, next) => {
  const usersData = await getAllUsers();

  res.status(200).json({
    status: 200,
    message: "Successfully found the amount of users!",
    data: usersData,
  });
};
