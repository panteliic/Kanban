import { Router } from "express";
import { CreateBoard } from "../controllers/board/createBoard";
import { getUserBoards } from "../controllers/board/getBoards";
const router = Router();

router.post("/create", CreateBoard)
router.get("/getBoards/:userId", getUserBoards)
export default router;
