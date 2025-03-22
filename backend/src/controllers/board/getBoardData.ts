import { AppDataSource } from "../../data-source";
import { Board } from "../../entity/Board";

export const getBoardData = async (req, res) => {
  const { boardId } = req.params;

  try {
    const board = await AppDataSource.getRepository(Board).findOne({
      where: { id: boardId },
      relations: {
        columns: {
          tasks: {
            subtasks: true,
          },
        },
      },
      order: {
        columns: {
          id: "ASC",
          tasks: {
            createdAt: "DESC",
          },
        },
      },
    });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.status(200).json(board);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
