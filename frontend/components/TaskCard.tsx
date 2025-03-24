"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Subtask, TaskCardType } from "@/types";
import { Draggable } from "@hello-pangea/dnd";
import { Checkbox } from "./ui/checkbox";
import updateSubtaskAPI from "@/utils/updateSubtask"; 

const TaskCard = ({
  id,
  title,
  description,
  subtasks,
  index,
}: TaskCardType) => {
  const [updatedSubtasks, setUpdatedSubtasks] = useState<Subtask[]>(subtasks);
  const completedSubtasks = updatedSubtasks.filter(
    (subtask) => subtask.completed
  ).length;


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
          <h3 className="font-medium">Subtasks</h3>
          <div className="flex gap-2 flex-col mt-5">
            {updatedSubtasks.map((subtask) => (
              <div
                key={subtask.id}
                className="flex justify-start items-center gap-4 cursor-pointer hover:bg-secondary px-1 py-2 rounded"
                onClick={() => handleSubtaskChange(subtask.id)} 
              >
                <Checkbox
                  id={subtask.id}
                  defaultChecked={subtask.completed}
                  className="w-5 h-5 "
                />
                <label
                  htmlFor={subtask.id}
                  className="text-sm font-medium cursor-pointer"
                >
                  {subtask.title}
                </label>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskCard;
