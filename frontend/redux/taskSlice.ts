// redux/tasksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface ColumnsData {
  [key: string]: Task[];
}

interface TasksState {
  tasks: ColumnsData;
}

const initialState: TasksState = {
  tasks: {},
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasksData(state, action: PayloadAction<ColumnsData>) {
      state.tasks = action.payload;
    },
  },
});

export const { setTasksData } = tasksSlice.actions;
export default tasksSlice.reducer;
