import { AppDataSource } from "../../data-source";
import { BoardColumn } from "../../entity/BoardColumn";
import { Task } from "../../entity/Task";

export const updateTaskColumn = async (req, res) => {
    const { taskId } = req.params;
    const { newColumnId } = req.body;
  
    try {
      const taskRepository = AppDataSource.getRepository(Task);
      const columnRepository = AppDataSource.getRepository(BoardColumn);
  
      const task = await taskRepository.findOne({
        where: { id: taskId },
      });
  
      if (!task) return res.status(404).json({ message: "Task not found" });
  
      const newColumn = await columnRepository.findOne({
        where: { id: newColumnId },
      });
  
      if (!newColumn) return res.status(404).json({ message: "Column not found" });
  
      task.column = newColumn;
      await taskRepository.save(task);
  
      res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
      console.error("Error updating task column:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  