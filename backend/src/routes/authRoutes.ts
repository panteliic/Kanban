import { Router } from "express";
import { googleAuthCallback, user } from "../controllers/authController";
const passport = require("passport");

const router = Router();

router.get(
  "/api/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    accessType: "offline",
    prompt: "consent",
  })
);

router.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/signin", // Definišite rutu za neuspeh
    session: false,
  }),
  googleAuthCallback
);
router.get("/api/auth/user",user);
export default router;
