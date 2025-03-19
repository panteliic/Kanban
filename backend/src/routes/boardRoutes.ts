import { Router } from "express";
import { CreateBoard } from "../controllers/board/createBoard";
import { getUserBoards } from "../controllers/board/getBoards";
import { getBoardData } from "../controllers/board/getBoardData";
import { createNewTask } from "../controllers/board/createNewTask";
const router = Router();

router.post("/create", CreateBoard)
router.get("/getBoards/:userId", getUserBoards)
router.get("/getBoardData/:boardId", getBoardData)
router.post("/createNewTask", createNewTask)
export default router;
