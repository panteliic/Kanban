import { Router } from "express";
import { googleAuthCallback } from "../controllers/auth/googleAuthCallback";
import { user } from "../controllers/auth/getUser";
import { refreshAccessToken } from "../controllers/auth/refreshAccessToken";
import { logout } from "../controllers/auth/logout";
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
    failureRedirect: "/auth/sign-in",
    session: false,
  }),
  googleAuthCallback
);

router.get("/api/auth/user", user);
router.get("/api/auth/refresh",refreshAccessToken);
router.post("/api/auth/logout", logout);

export default router;
