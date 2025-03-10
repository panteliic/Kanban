import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { RefreshToken } from "../entity/RefreshToken";


export const verifyRefreshToken = async (token: string) => {
    try {
      const refreshTokenRepo = AppDataSource.getRepository(RefreshToken);
      const tokenInDb = await refreshTokenRepo.findOne({
        where: { token },
        relations: ["user"],
      });
      
      if (!tokenInDb) return null;
  
      return tokenInDb.user;
    } catch (error) {
      return null;
    }
  };
  