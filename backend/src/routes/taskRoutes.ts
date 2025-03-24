import { Router } from "express";
import { updateTaskColumn } from "../controllers/task/upadateTaskColumn";
import { updateSubtask } from "../controllers/task/updateSubtask";
const router = Router();


router.put("/updateTask/:taskId", updateTaskColumn);
router.put("/updateSubtask", updateSubtask);

export default router;
