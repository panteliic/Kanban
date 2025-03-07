import { Request, Response } from "express";
import { generateTokens } from "../utils/generateToken";
import { verifyRefreshToken } from "../utils/verifyRefreshToken";
import { AppDataSource } from "../data-source";
import { RefreshToken } from "../entity/RefreshToken";

export const googleAuthCallback = (req: any, res: Response) => {
  if (!req.user) return res.redirect("/login");

  const { accessToken, refreshToken } = req.user;

  res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "strict" });
  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "strict" });

  res.redirect("/dashboard");
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

  const user = await verifyRefreshToken(refreshToken);
  if (!user) return res.status(403).json({ message: "Invalid refresh token" });

  const tokens = await generateTokens(user);
  res.cookie("accessToken", tokens.accessToken, { httpOnly: true, secure: true, sameSite: "strict" });
  res.json({ accessToken: tokens.accessToken });
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    const refreshTokenRepo = AppDataSource.getRepository(RefreshToken);
    await refreshTokenRepo.delete({ token: refreshToken });
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
};
