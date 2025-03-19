import { AppDataSource } from "../../data-source";
import { Task } from "../../entity/Task";
import { BoardColumn } from "../../entity/BoardColumn";
import { Subtask } from "../../entity/Subtask";

export const createNewTask = async (req, res) => {
  const { columnId, title, description, subtasks } = req.body;

  try {
    const column = await AppDataSource.getRepository(BoardColumn).findOne({
      where: { id: columnId },
    });

    if (!column) return res.status(404).json({ message: "Column not found" });
    const newTask = AppDataSource.getRepository(Task).create({
      title,
      description,
      column,
    });

    await AppDataSource.getRepository(Task).save(newTask);

    let createdSubtasks: Subtask[] = [];
    if (subtasks && subtasks.length > 0) {
      createdSubtasks = subtasks.map((subtaskTitle) =>
        AppDataSource.getRepository(Subtask).create({
          title: subtaskTitle,
          task: newTask,
        })
      );

      await AppDataSource.getRepository(Subtask).save(createdSubtasks);
    }
    newTask.subtasks = createdSubtasks;

    res.status(201).json({
      message: "Task created successfully",
      task: {
        id: newTask.id,
        title: newTask.title,
        description: newTask.description,
        subtasks: createdSubtasks.map(({ id, title, completed }) => ({
          id,
          title,
          completed,
        })),
      },
    });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
