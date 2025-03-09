import { Request, Response } from "express";
import { generateTokens } from "../../utils/generateToken";
import { AppDataSource } from "../../data-source";
import { RefreshToken } from "../../entity/RefreshToken";
import { verifyRefreshToken } from "../../utils/verifyRefreshToken";

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const user = await verifyRefreshToken(refreshToken);

    if (!user || !user.id) {
      await AppDataSource.getRepository(RefreshToken).delete({ token: refreshToken });
      res.clearCookie("refreshToken");
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    const tokens = await generateTokens(user);

    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 1000 * 60 * 15), 
    });

    res.json({ accessToken: tokens.accessToken });

  } catch (error) {
    console.error("Error refreshing access token:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
