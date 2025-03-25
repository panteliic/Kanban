import { Router } from "express";
import { CreateBoard } from "../controllers/board/createBoard";
import { getUserBoards } from "../controllers/board/getBoards";
import { getBoardData } from "../controllers/board/getBoardData";
import { createNewTask } from "../controllers/board/createNewTask";
import { DeleteBoard } from "../controllers/board/deleteBoard";
import { updateBoard } from "../controllers/board/editBoard";
import { createNewColumns } from "../controllers/board/createNewColumn";
const router = Router();

router.post("/create", CreateBoard);
router.get("/getBoards/:userId", getUserBoards);
router.get("/getBoardData/:boardId", getBoardData);
router.post("/createNewTask", createNewTask);
router.delete("/delete/:boardId", DeleteBoard);
router.put("/updateBoard", updateBoard);
router.put("/createNewColumns", createNewColumns);
export default router;
