import { Board } from "@/types";
import api from "../utils/api";

export const fetchBoards = async (userId: string) => {
  try {
    const response = await api.get<Board[]>(`/boards/getBoards/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching boards:", error);
    throw error;
  }
};
