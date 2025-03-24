import api from "./api";

export const deleteTaskApi = async (taskId: string) => {
    try {
      const response = await api.delete(`/task/delete/${taskId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting board:", error);
      throw new Error("Could not delete board.");
    }
  };