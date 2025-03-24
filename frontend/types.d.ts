// types.d.ts

interface Board {
  id: string;
  title: string;
  columns: Column[];
}

export interface Subtask {
  id: string;
  title: string;
  completed?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  subtasks: Subtask[];
}
export interface TaskCardType {
  id: string;
  title: string;
  description: string;
  status:string;
  subtasks: Subtask[];
  index: number;
}
export interface ColumnData {
  id: string;
  name: string;
  tasks: Task[];
}

export interface BoardData {
  columns: ColumnData[];
}

export interface BoardState {
  boards: Board[];
}

export interface TaskState {
  tasks: ColumnsData;
}

export type ColumnsData = {
  [columnId: string]: {
    column: Column;
    tasks: Task[];
  };
};

export interface Column {
  id: string;
  name: string;
}
type ColumnProps = {
  columnId: string;
  columnName: string;
  tasks: Task[];
};
