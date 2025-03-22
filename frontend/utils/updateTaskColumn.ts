import api from "./api";

export const updateTaskColumn = async (taskId: string, newColumnId: string) => {
    try {
      await api.put(`/task/updateTask/${taskId}`, {
        newColumnId,
      });
    } catch (error) {
      console.error("Error updating task column:", error);
      throw error;
    }
  };