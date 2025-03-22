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
  id: string; // Added id field to identify the column
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
  },
});

export const { setTasksData } = tasksSlice.actions;
export default tasksSlice.reducer;
