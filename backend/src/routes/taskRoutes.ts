import { Router } from "express";
import { updateTaskColumn } from "../controllers/task/upadateTaskColumn";
import { updateSubtask } from "../controllers/task/updateSubtask";
import { DeleteTask } from "../controllers/task/deleteTask";
const router = Router();


router.put("/updateTask/:taskId", updateTaskColumn);
router.put("/updateSubtask", updateSubtask);
router.delete("/delete/:taskId", DeleteTask);

export default router;
