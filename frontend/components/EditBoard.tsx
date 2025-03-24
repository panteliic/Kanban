"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Board, Column } from "@/types";
import { updateBoardTitle } from "@/redux/boardSlice";
import updateBoardAPI from "@/utils/updateBoard";
import { updateColumnName } from "@/redux/taskSlice";

function EditBoard() {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.board.boards);

  const pathname = usePathname();

  const currentBoardId = pathname?.split("/").pop();
  let currentBoard: Board | undefined;
  if (currentBoardId !== "")
    currentBoard = boards.find((board) => board.id === currentBoardId);

  const [boardName, setBoardName] = useState(currentBoard?.title || "");
  const [columns, setColumns] = useState<Column[]>(currentBoard?.columns || []);

  const handleBoardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
  };

  const handleColumnChange = (index: number, newName: string) => {
    if (["todo", "doing", "done"].includes(columns[index].name)) return;

    const updatedColumns = [...columns];
    updatedColumns[index] = { ...updatedColumns[index], name: newName };
    setColumns(updatedColumns);
  };

  const handleSaveChanges = async () => {
    if (!currentBoardId) return;
    try {
      await updateBoardAPI(currentBoardId, boardName, columns);
      dispatch(
        updateBoardTitle({ boardId: currentBoardId, newTitle: boardName })
      );
      columns.forEach((column) => {
        dispatch(
          updateColumnName({ columnId: column.id, newName: column.name })
        );
      });
    } catch (err) {
      console.error("Error updating board:", err);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <span className="cursor-pointer font-semibold capitalize text-muted-foreground transition hover:opacity-65">
          edit board
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Board</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label>Name</label>
            <Input
              placeholder="Board name..."
              value={boardName}
              onChange={handleBoardNameChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Columns</label>
            {columns.map((column, index) => (
              <Input
                key={column.id}
                placeholder="Column name..."
                value={column.name}
                onChange={(e) => handleColumnChange(index, e.target.value)}
                disabled={["todo", "doing", "done"].includes(column.name)}
                readOnly={["todo", "doing", "done"].includes(column.name)}
              />
            ))}
          </div>

          <div>
            <Button
              type="button"
              className="bg-primary text-primary-foreground mt-4 w-full"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditBoard;
