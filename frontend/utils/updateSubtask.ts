import api from "./api";
import { Subtask } from "@/types";

async function updateSubtaskAPI(subtaskId: string): Promise<Subtask> {
  try {
    const response = await api.put(`/task/updateSubtask`, {
      subTaskId: subtaskId,
    });

    if (response.status === 200) {
      return response.data.subtask;
    } else {
      throw new Error(response.data.message || "Failed to update subtask");
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update subtask");
  }
}

export default updateSubtaskAPI;
