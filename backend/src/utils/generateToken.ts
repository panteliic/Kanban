const jwt = require("jsonwebtoken");
import { AppDataSource } from "../data-source";
import { RefreshToken } from "../entity/RefreshToken";
import { Users } from "../entity/User";

export const generateTokens = async (user: Users) => {
  const payload = { sub: user.id, email: user.email };

  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });

  const refreshTokenRepo = AppDataSource.getRepository(RefreshToken);
  const newRefreshToken = refreshTokenRepo.create({
    token: refreshToken,
    user,
  });
  await refreshTokenRepo.save(newRefreshToken);

  return { accessToken, refreshToken };
};
