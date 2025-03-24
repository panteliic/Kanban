import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Subtask {
  id: string;
  title: string;
  completed?: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  subtasks: Subtask[];
}

interface Column {
  id: string;
  name: string;
}

interface ColumnsData {
  [columnId: string]: {
    column: Column;
    tasks: Task[];
  };
}

interface TasksState {
  tasks: ColumnsData;
}

const initialState: TasksState = {
  tasks: {},
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasksData(state, action: PayloadAction<ColumnsData>) {
      state.tasks = action.payload;
    },
    updateColumnName(
      state,
      action: PayloadAction<{ columnId: string; newName: string }>
    ) {
      const { columnId, newName } = action.payload;

      const columnData = state.tasks[columnId];
      if (columnData) {
        columnData.column.name = newName;
      }
    },
    deleteTaskAction(state, action: PayloadAction<{ taskId: string; columnId: string }>) {
      const { taskId, columnId } = action.payload;
      const column = state.tasks[columnId];

      if (column) {
        column.tasks = column.tasks.filter((task) => task.id !== taskId);
      }
    },
    moveTask(
      state,
      action: PayloadAction<{
        taskId: string;
        sourceColumnId: string;
        destinationColumnId: string;
        sourceIndex: number;
        destinationIndex: number;
      }>
    ) {
      const {
        taskId,
        sourceColumnId,
        destinationColumnId,
        sourceIndex,
        destinationIndex,
      } = action.payload;
      if (!state.tasks[sourceColumnId] || !state.tasks[destinationColumnId])
        return;

      const sourceColumn = state.tasks[sourceColumnId];
      const destinationColumn = state.tasks[destinationColumnId];
      const [movedTask] = sourceColumn.tasks.splice(sourceIndex, 1);
      destinationColumn.tasks.splice(destinationIndex, 0, movedTask);
    },
  },
});

export const { setTasksData, updateColumnName, moveTask,deleteTaskAction} = tasksSlice.actions;
export default tasksSlice.reducer;
