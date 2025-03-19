import { AppDataSource } from "../../data-source";
import { Users } from "../../entity/User";
import { Board } from "../../entity/Board";
import { BoardColumn } from "../../entity/BoardColumn";

export const CreateBoard = async (req, res) => {
  const { title, columns, userId } = req.body;

  try {
    const user = await AppDataSource.getRepository(Users).findOne({
      where: { id: userId },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const newBoard = AppDataSource.getRepository(Board).create({ title, user });
    await AppDataSource.getRepository(Board).save(newBoard);

    if (Array.isArray(columns) && columns.length > 0) {
      const newColumns = columns.map((col) => {
        return AppDataSource.getRepository(BoardColumn).create({
          name: col.name,
          board: newBoard,
        });
      });

      await AppDataSource.getRepository(BoardColumn).save(newColumns);
      newBoard.columns = newColumns;
    }

    res.status(201).json({ message: "Created new board" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
