import { Router } from "express";
import { CreateBoard } from "../controllers/board/createBoard";
import { getUserBoards } from "../controllers/board/getBoards";
import { getBoardData } from "../controllers/board/getBoardData";
const router = Router();

router.post("/create", CreateBoard)
router.get("/getBoards/:userId", getUserBoards)
router.get("/getBoardData/:boardId", getBoardData)
export default router;
