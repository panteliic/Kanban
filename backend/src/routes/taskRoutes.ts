import { Router } from "express";
import { updateTaskColumn } from "../controllers/task/upadateTaskColumn";
const router = Router();


router.put("/updateTask/:taskId", updateTaskColumn);

export default router;
