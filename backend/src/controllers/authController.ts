import { Request, Response } from "express";
import { generateTokens } from "../utils/generateToken";
import { verifyRefreshToken } from "../utils/verifyRefreshToken";
import { AppDataSource } from "../data-source";
import { RefreshToken } from "../entity/RefreshToken";
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

export const refreshAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  const user = await verifyRefreshToken(refreshToken);
  if (!user) return res.status(403).json({ message: "Invalid refresh token" });

  const tokens = await generateTokens(user);
  res.cookie("accessToken", tokens.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
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

export const user = async (req, res) => {
  try {
    // Proveri da li postoji refresh token u kolačićima
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    // Verifikuj refresh token
    const user = await verifyRefreshToken(refreshToken);
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Vraćanje korisničkih podataka
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
