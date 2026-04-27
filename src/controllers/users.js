import { THIRTY_DAY } from "../portfolio/portfolio.js";

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
  const { sessionId, refreshToken } = await loginUser(req.body);

  res.cookie("sessionId", sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    expires: new Date(Date.now() + THIRTY_DAY),
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    expires: new Date(Date.now() + THIRTY_DAY),
  });

  res.status(200).json({
    status: 200,
    message: "User logged in successfully",
    data: {
      sessionId,
      // refreshToken,
    },
  });
};

export const logoutUserController = async (req, res, next) => {
  await logoutUser({ sessionId: req.cookies.sessionId });

  res.clearCookie("sessionId", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
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

export const refreshTokenController = async (req, res) => {
  const { sessionId, refreshToken } = await refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  res.cookie("sessionId", sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    expires: new Date(Date.now() + THIRTY_DAY),
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    expires: new Date(Date.now() + THIRTY_DAY),
  });

  res.status(200).json({
    status: 200,
    message: "Session refreshed successfully",
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
