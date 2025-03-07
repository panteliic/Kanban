const express = require("express");
import passport from "../config/passport";
import {
  googleAuthCallback,
  refreshAccessToken,
  logout,
} from "../controllers/authController";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthCallback
);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);

export default router;
