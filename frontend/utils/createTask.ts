import api from "./api";
import { Task } from "@/types";

export const createTask = async (
  columnId: number,
  title: string,
  description: string,
  subtasks: string[]
): Promise<Task> => {
  const response = await api.post("/boards/createNewTask", {
    columnId,
    title,
    description,
    subtasks,
  });
  return response.data.task;
};
