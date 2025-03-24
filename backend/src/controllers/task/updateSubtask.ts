import { AppDataSource } from "../../data-source";
import { Subtask } from "../../entity/Subtask";


export const updateSubtask = async (req, res) => {
  const { subTaskId } = req.body;

  try {
    const subtaskRepository = AppDataSource.getRepository(Subtask);

    const subtask = await subtaskRepository.findOne({
      where: { id: subTaskId },
    });

    if (!subtask) return res.status(404).json({ message: "Subtask not found" });

    subtask.completed = !subtask.completed;
    await subtaskRepository.save(subtask);

    res.status(200).json({ message: "Subtask updated successfully", subtask });
  } catch (error) {
    console.error("Error updating task column:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
