import api from "./api";

export const fetchBoardData = async (pathname: string) => {
  const currentBoardId = pathname?.split("/").pop();
  try {
    const response = await api.get(`/boards/getBoardData/${currentBoardId}`);
    const boardData = response.data;

    const columnsData: any = {};
    boardData.columns.forEach((column: any) => {
      columnsData[column.id] = {
        column: {
          id: column.id,
          name: column.name,
        },
        tasks: column.tasks.map((task: any) => ({
          id: task.id,
          title: task.title,
          subtasks: task.subtasks.map((subtask: any) => ({
            id: subtask.id,
            title: subtask.title,
            completed: subtask.completed,
          })),
        })),
      };
    });
    return columnsData;
  } catch (error) {
    throw new Error("Error fetching board data");
  }
};
