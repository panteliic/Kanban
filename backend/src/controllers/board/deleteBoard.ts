import { AppDataSource } from "../../data-source";
import { Board } from "../../entity/Board";

export const DeleteBoard = async (req, res) => {
  const { boardId } = req.params;

  try {
    // Pronađi board sa povezanim kolumnama
    const boardToDelete = await AppDataSource.getRepository(Board).findOne({
      where: { id: boardId },
      relations: ["columns", "columns.tasks", "columns.tasks.subtasks"], 
    });

    if (!boardToDelete) {
      return res.status(404).json({ message: "Board not found" });
    }

    // Obrišite board
    await AppDataSource.getRepository(Board).remove(boardToDelete);

    res.status(200).json({ message: "Board deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
