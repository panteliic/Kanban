import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Subtask {
  id: string;
  title: string;
  completed?: boolean;
}

interface Task {
  id: string;
  title: string;
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
    updateColumnName(state, action: PayloadAction<{ columnId: string; newName: string }>) {
      const { columnId, newName } = action.payload;

      const columnData = state.tasks[columnId];
      if (columnData) {
        columnData.column.name = newName;
      }
    },
  },
});

export const { setTasksData, updateColumnName } = tasksSlice.actions;
export default tasksSlice.reducer;
