import { Router } from "express";
import { CreateBoard } from "../controllers/board/createBoard";

const passport = require("passport");

const router = Router();

router.post("/create", CreateBoard)
export default router;
