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

    const defaultColumns = ["To Do", "Doing", "Done"];

    const columnsToUse = [...defaultColumns];

    if (Array.isArray(columns) && columns.length > 0) {
      columnsToUse.push(...columns); 
    }

    const newColumns = columnsToUse.map((col) => {
      return AppDataSource.getRepository(BoardColumn).create({
        name: col,
        board: newBoard,
      });
    });

    await AppDataSource.getRepository(BoardColumn).save(newColumns);
    newBoard.columns = newColumns;

    res.status(201).json({ message: "Created new board", board: newBoard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
