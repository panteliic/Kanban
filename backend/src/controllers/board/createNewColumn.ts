import { AppDataSource } from "../../data-source";
import { Board } from "../../entity/Board";
import { BoardColumn } from "../../entity/BoardColumn";
export const createNewColumns = async (req, res) => {
    let { boardId, columns } = req.body;
  
    try {
      const board = await AppDataSource.getRepository(Board).findOne({
        where: { id: boardId },
        relations: ["columns"],
      });
  
      if (!board) return res.status(404).json({ message: "Board not found" });
  

      if (!Array.isArray(columns)) {
        if (typeof columns === "object") {
          columns = Object.values(columns);
        } else {
          return res.status(400).json({ message: "Invalid columns data format" });
        }
      }
  
      if (columns.length === 0) {
        return res.status(400).json({ message: "Columns array is empty" });
      }
  
      const newColumns = columns.map((colName) => {
        const column = new BoardColumn();
        column.name = colName;
        column.board = board;
        return column;
      });
  
      await AppDataSource.getRepository(BoardColumn).save(newColumns);
  
      const updatedBoard = await AppDataSource.getRepository(Board).findOne({
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
  
      res.status(201).json({ message: "Created new columns", board: updatedBoard });
    } catch (err) {
      console.error("Error creating columns:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  