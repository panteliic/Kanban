import { AppDataSource } from "../../data-source";
import { Board } from "../../entity/Board";
import { BoardColumn } from "../../entity/BoardColumn";

export const updateBoard = async (req, res) => {
  const { boardId, title, columns } = req.body;

  try {
    const board = await AppDataSource.getRepository(Board).findOne({
      where: { id: boardId },
      relations: ["columns"],
    });

    if (!board) return res.status(404).json({ message: "Board not found" });

    board.title = title;

    if (columns && columns.length > 0) {
      const updatedColumns = await Promise.all(
        columns.map(async (columnData: { id: string; name: string }) => {
          const column = await AppDataSource.getRepository(BoardColumn).findOne(
            {
              where: { id: columnData.id },
            }
          );

          if (column) {
            column.name = columnData.name;
            return AppDataSource.getRepository(BoardColumn).save(column);
          } else {
            return null;
          }
        })
      );

      board.columns = updatedColumns.filter((column) => column !== null);
    }

    await AppDataSource.getRepository(Board).save(board);

    res.status(200).json({
      message: "Board updated successfully",
      board: {
        id: board.id,
        title: board.title,
        columns: board.columns.map((column) => ({
          id: column.id,
          name: column.name,
        })),
      },
    });
  } catch (err) {
    console.error("Error updating board:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
