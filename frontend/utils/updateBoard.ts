import { Board, Column } from "@/types";
import api from "./api";

async function updateBoardAPI(
  boardId: string,
  title: string,
  columns: Column[]
): Promise<Board> {
  try {
    const response = await api.put(`/boards/updateBoard/${boardId}`, {
      title,
      columns,
    });

    if (response.status === 200) {
      return response.data.updatedBoard;
    } else {
      throw new Error(response.data.message || "Failed to update board");
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update board");
  }
}

export default updateBoardAPI;
