import api from "./api";

export const createBoard = async (
  title: string,
  columns: string[],
  userId: string
) => {
  const response = await api.post("/boards/create", {
    title,
    columns: columns.filter((col) => col.trim() !== ""),
    userId,
  });
  return response.data;
};
