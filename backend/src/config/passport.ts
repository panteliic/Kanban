const passport = require("passport");
const dotenv = require("dotenv");
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { AppDataSource } from "../data-source";
import { Users } from "../entity/User";
import { generateTokens } from "../utils/generateToken";
import { RefreshToken } from "../entity/RefreshToken";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userRepository = AppDataSource.getRepository(Users);
        let user = await userRepository.findOne({ where: { googleId: profile.id } });

        if (!user) {
          user = userRepository.create({
            googleId: profile.id,
            email: profile.emails?.[0]?.value,
            name: profile.displayName,
            avatar: profile.photos?.[0]?.value,
          });
          
          await userRepository.save(user);
        }
        const tokens = await generateTokens(user);

        return done(null, { user, ...tokens });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;
