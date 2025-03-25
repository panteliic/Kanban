import api from "./api";
import { Board } from "@/types";

export const createNewColumnAPI = async (
  boardId: string,
  name: string[]
): Promise<Board> => {
  const response = await api.put("/boards/createNewColumns", {
    boardId,
    columns: name, 
  });
  return response.data.board; 
};
