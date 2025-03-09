import { Request, Response } from "express";
import { generateTokens } from "../../utils/generateToken";
import { AppDataSource } from "../../data-source";
import { RefreshToken } from "../../entity/RefreshToken";

export const googleAuthCallback = async (req: any, res: Response) => {
  try {
    if (!req.user) {
      console.warn("Google Auth: No user found in request.");
      return res.redirect(`${process.env.CLIENT_URL}/auth/sign-in`);
    }

    const { user, refreshToken } = req.user;

    const { accessToken, refreshToken: newRefreshToken } = await generateTokens(
      user
    );

    await AppDataSource.getRepository(RefreshToken).save({
      token: newRefreshToken,
      user: user,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + 1000 * 60 * 15),
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });
    console.log(accessToken, newRefreshToken);

    console.log(`User authenticated: ${user.email} (ID: ${user.id})`);

    res.redirect(`${process.env.CLIENT_URL}`);
  } catch (error) {
    console.error("Google Callback Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};