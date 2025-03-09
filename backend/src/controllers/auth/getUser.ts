import { Request, Response } from "express";
import { verifyRefreshToken } from "../../utils/verifyRefreshToken";
import { AppDataSource } from "../../data-source";
import { RefreshToken } from "../../entity/RefreshToken";

export const user = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return await res.status(401).json({ message: "No refresh token" });
    }

    const user = await verifyRefreshToken(refreshToken);

    if (!user) {
      await AppDataSource.getRepository(RefreshToken).delete({ token: refreshToken });
      res.clearCookie("refreshToken");
      return await res.status(403).json({ message: "Invalid refresh token" });
    }

    await res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    await res.status(500).json({ message: "Internal server error" });
  }
};
