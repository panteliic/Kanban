import { Router } from "express";
import { CreateBoard } from "../controllers/board/createBoard";
import { getUserBoards } from "../controllers/board/getBoards";
import { getBoardData } from "../controllers/board/getBoardData";
import { createNewTask } from "../controllers/board/createNewTask";
import { DeleteBoard } from "../controllers/board/deleteBoard";
const router = Router();

router.post("/create", CreateBoard);
router.get("/getBoards/:userId", getUserBoards);
router.get("/getBoardData/:boardId", getBoardData);
router.post("/createNewTask", createNewTask);
router.delete("/delete/:boardId", DeleteBoard);
router.put("/updateTask/:taskId", DeleteBoard);

export default router;
