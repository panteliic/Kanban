"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { usePathname } from "next/navigation";
import { setTasksData } from "@/redux/taskSlice";
import { Board, Column } from "@/types";
import { createTask } from "@/utils/createTask";

function CreateTask() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const [mobile, setMobile] = useState(false);
  const [subtasks, setSubtasks] = useState<string[]>([""]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setMobile(window.innerWidth <= 850);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const addSubtask = () => {
    setSubtasks([...subtasks, ""]);
  };

  const removeSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleSubtaskChange = (index: number, value: string) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = value;
    setSubtasks(updatedSubtasks);
  };

  const boards = useSelector(
    (state: RootState) => state.board.boards
  ) as Board[];
  const pathname = usePathname();
  const boardId: string | undefined = pathname?.split("/").pop();
  const currentBoard: Board | undefined = boards.find(
    (board) => board.id === boardId
  );
  const columns: Column[] = currentBoard?.columns || [];

  const handleCreateTask = async () => {
    if (!currentBoard || !status) return;

    try {
      const newTask = await createTask(
        Number(status),
        title,
        description,
        subtasks
      );

      const updatedTasks = { ...tasks };
      const columnKey = status.toLowerCase();

      if (!updatedTasks[columnKey]) {
        updatedTasks[columnKey] = {
          column: { id: status, name: "" },
          tasks: [],
        };
      }

      updatedTasks[columnKey] = {
        ...updatedTasks[columnKey],
        tasks: [newTask, ...updatedTasks[columnKey].tasks],
      };

      dispatch(setTasksData(updatedTasks));

      setTitle("");
      setDescription("");
      setSubtasks([""]);
      setStatus(null);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-primary text-primary-foreground flex justify-center items-center px-5 capitalize rounded-full text-lg h-12">
        {mobile ? "+" : "+ add new task"}
      </DialogTrigger>

      <DialogContent className="h-screen w-screen md:h-auto">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <label className="font-semibold">Title</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-semibold">Description</label>
            <Textarea
              className="resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <h3 className="font-semibold mb-3">Subtasks</h3>
            <ul className="flex flex-col gap-3">
              {subtasks.map((subtask, index) => (
                <li key={index} className="flex gap-3 items-center">
                  <Input
                    type="text"
                    value={subtask}
                    onChange={(e) => handleSubtaskChange(index, e.target.value)}
                  />
                  <Image
                    src="/assets/icon-cross.svg"
                    alt="remove subtask"
                    width={16}
                    height={16}
                    className="w-4 cursor-pointer"
                    onClick={() => removeSubtask(index)}
                  />
                </li>
              ))}
            </ul>
            <Button
              type="button"
              className="bg-primary text-primary-foreground flex justify-center items-center mt-5 px-5 capitalize rounded-full text-md w-full"
              onClick={addSubtask}
            >
              + add new subtask
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-semibold">Status</label>
            <Select onValueChange={setStatus}>
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
            type="button"
            className="bg-primary text-primary-foreground flex justify-center items-center mt-5 px-5 capitalize rounded-full text-md w-full"
            onClick={handleCreateTask}
          >
            Create Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTask;
