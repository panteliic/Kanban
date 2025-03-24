"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Board, Column, Subtask, TaskCardType } from "@/types";
import { Draggable } from "@hello-pangea/dnd";
import { Checkbox } from "./ui/checkbox";
import updateSubtaskAPI from "@/utils/updateSubtask";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { usePathname } from "next/navigation";
import { updateTaskColumn } from "@/utils/updateTaskColumn";
import { deleteTaskAction, setTasksData } from "@/redux/taskSlice";
import { Button } from "./ui/button";
import { deleteTaskApi } from "@/utils/deleteTask";

const TaskCard = ({
  id,
  title,
  description,
  subtasks,
  status,
  index,
}: TaskCardType) => {
  const [updatedSubtasks, setUpdatedSubtasks] = useState<Subtask[]>(subtasks);
  const completedSubtasks = updatedSubtasks.filter(
    (subtask) => subtask.completed
  ).length;

  const [newStatus, setStatus] = useState<string | null>(null);
  const boards = useSelector(
    (state: RootState) => state.board.boards
  ) as Board[];
  const tasks = useSelector((state: RootState) => state.task.tasks);

  const pathname = usePathname();
  const boardId: string | undefined = pathname?.split("/").pop();
  const currentBoard: Board | undefined = boards.find(
    (board) => board.id === boardId
  );
  const columns: Column[] = currentBoard?.columns || [];
  const dispatch = useDispatch();
  const handleSubtaskChange = async (subtaskId: string) => {
    try {
      const updatedSubtask = await updateSubtaskAPI(subtaskId);

      const updatedSubtasksState = updatedSubtasks.map((subtask) =>
        subtask.id === updatedSubtask.id
          ? { ...subtask, completed: updatedSubtask.completed }
          : subtask
      );
      setUpdatedSubtasks(updatedSubtasksState);
    } catch (error) {
      console.error("Failed to update subtask:", error);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
    console.log(tasks);

    const sourceColumnId = status;
    const destinationColumnId = newStatus;

    const task = tasks[sourceColumnId]?.tasks?.find((task) => task.id === id);
    if (task) {
      const sourceColumnData = { ...tasks[sourceColumnId] };
      const destinationColumnData = { ...tasks[destinationColumnId] };

      const sourceTasks = [...sourceColumnData.tasks];
      const destinationTasks = [...destinationColumnData.tasks];
      const [movedTask] = sourceTasks.splice(
        sourceTasks.findIndex((task) => task.id === id),
        1
      );
      destinationTasks.push(movedTask);
      sourceColumnData.tasks = sourceTasks;
      destinationColumnData.tasks = destinationTasks;

      dispatch(
        setTasksData({
          ...tasks,
          [sourceColumnId]: sourceColumnData,
          [destinationColumnId]: destinationColumnData,
        })
      );

      try {
        await updateTaskColumn(id, newStatus);
      } catch (error) {
        console.error("Failed to update task status:", error);
      }
    }
  };
  const deleteTask = async () => {
    try {
      await deleteTaskApi(id);

      const columnId = status;
      dispatch(deleteTaskAction({ taskId: id, columnId }));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Draggable draggableId={id} index={index}>
          {(provided) => (
            <div
              className="bg-background w-full p-4 mb-4 rounded-md shadow-md text-start"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div className="text-foreground">{title}</div>
              <div className="mt-2 text-sm text-[#828fa3] text-start">
                {completedSubtasks} of {subtasks.length} subtasks
              </div>
            </div>
          )}
        </Draggable>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-sm text-muted-foreground">
            {description ? description : "No description"}
          </p>
        </div>

        <div className="mt-4">
          <h3 className="font-medium">
            Subtasks ({completedSubtasks} of {subtasks.length})
          </h3>
          <div className="flex gap-2 flex-col mt-5">
            {updatedSubtasks.map((subtask) => (
              <div
                key={subtask.id}
                className="flex justify-start items-center gap-4 cursor-pointer hover:bg-secondary px-1 py-2 rounded"
                onClick={() => handleSubtaskChange(subtask.id)}
              >
                <Checkbox
                  id={subtask.id}
                  checked={subtask.completed}
                  className="w-5 h-5 "
                />
                <label
                  htmlFor={subtask.id}
                  className={`text-sm font-medium cursor-pointer ${
                    subtask.completed && "line-through text-muted-foreground"
                  }`}
                >
                  {subtask.title}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <label className="font-semibold">Status</label>
          <Select
            onValueChange={(value) => handleStatusChange(value)}
            value={newStatus || status}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {columns.map(({ id, name }) => (
                <SelectItem key={id} value={id.toString()}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          className="bg-red-600 hover:bg-red-600 hover:opacity-75"
          onClick={deleteTask}
        >
          Delete Task
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TaskCard;
