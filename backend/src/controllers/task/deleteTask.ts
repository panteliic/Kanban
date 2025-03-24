import { AppDataSource } from "../../data-source";
import { Task } from "../../entity/Task";

export const DeleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await AppDataSource.getRepository(Task).findOne({
      where: { id: taskId },
      relations: ["subtasks"],
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await AppDataSource.getRepository(Task).remove(task);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
