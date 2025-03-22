import api from "./api";

export const deleteBoardApi = async (boardId: string) => {
    try {
      const response = await api.delete(`/boards/delete/${boardId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting board:", error);
      throw new Error("Could not delete board.");
    }
  };