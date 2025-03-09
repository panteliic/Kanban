import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { RefreshToken } from "../../entity/RefreshToken";

export const logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
  
    if (refreshToken) {
      const refreshTokenRepo = AppDataSource.getRepository(RefreshToken);
      const tokenExists = await refreshTokenRepo.findOne({ where: { token: refreshToken } });
  
      if (tokenExists) {
        await refreshTokenRepo.delete({ token: refreshToken });
      }
    }
  
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
  
    res.json({ message: "Logged out" });
  };