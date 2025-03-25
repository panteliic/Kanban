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
import { Board } from "@/types";
import { useState } from "react";
import { createNewColumnAPI } from "@/utils/createNewColumn";
import { setTasksData } from "@/redux/taskSlice";
import { fetchBoardData } from "@/utils/fetchBoardData";

function CreateNewColumn() {
  const boards = useSelector((state: RootState) => state.board.boards);
  const dispatch = useDispatch();

  const pathname = usePathname();
  const currentBoardId = pathname?.split("/").pop();
  let currentBoard: Board | undefined;
  if (currentBoardId !== "") {
    currentBoard = boards.find((board) => board.id === currentBoardId);
  }

  const [newColumns, setNewColumns] = useState<string[]>([]);

  // Proveravamo ukupan broj kolona (postojeće + nove) i ograničavamo na 5
  const availableColumns = currentBoard ? currentBoard.columns.length + newColumns.length : 0;

  const addNewColumn = () => {
    if (availableColumns < 5) {
      setNewColumns([...newColumns, ""]);
    }
  };

  const handleColumnChange = (index: number, value: string) => {
    const updatedColumns = [...newColumns];
    updatedColumns[index] = value;
    setNewColumns(updatedColumns);
  };

  const saveChanges = async () => {
    if (currentBoard && newColumns.length > 0) {
      try {
        await createNewColumnAPI(currentBoard.id, newColumns);
        const response = await fetchBoardData(currentBoard.id);
        dispatch(setTasksData(response));
      } catch (error) {
        console.error("Error updating board:", error);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-80 h-screen p-4">
          <div className="w-full h-screen text-muted-foreground text-3xl font-semibold rounded-md p-4 bg-gradient-to-b from-background to-secondary flex items-center justify-center cursor-pointer">
            + New Column
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Column</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <label>Name</label>
          <Input
            placeholder="Board name..."
            value={currentBoard?.title || ""}
            readOnly={true}
            disabled={true}
          />
        </div>

        <div>
          <label>Columns</label>
          {currentBoard?.columns?.map((column, index) => (
            <Input
              key={index}
              type="text"
              value={column.name}
              readOnly={true}
              disabled={true}
              className="mt-2"
            />
          ))}
        </div>

        <div>
          {newColumns.map((column, index) => (
            <Input
              key={index}
              type="text"
              value={column}
              onChange={(e) => handleColumnChange(index, e.target.value)}
              placeholder={`New Column...`}
              className="mt-2"
            />
          ))}
        </div>

        <div>
          {availableColumns < 5 && (
            <Button
              type="button"
              onClick={addNewColumn}
              className="text-primary bg-primary-foreground mt-2 w-full hover:bg-primary-foreground hover:text-primary rounded-full"
            >
              + Add new column
            </Button>
          )}
          <Button
            type="button"
            onClick={saveChanges}
            className="bg-primary text-primary-foreground mt-4 w-full"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNewColumn;
