import { Board, BoardState, Column, ColumnData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: BoardState = {
  boards: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload;
    },
    addBoard: (state, action: PayloadAction<Board>) => {
      state.boards.push(action.payload);
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload
      );
    },
    clearBoards: (state) => {
      state.boards = [];
    },
    updateBoardTitle: (
      state,
      action: PayloadAction<{ boardId: string; newTitle: string }>
    ) => {
      const board = state.boards.find((b) => b.id === action.payload.boardId);
      if (board) {
        board.title = action.payload.newTitle;
      }
    },
    addColumnToBoard: (
      state,
      action: PayloadAction<{ boardId: string; column: ColumnData }>
    ) => {
      const board = state.boards.find((b) => b.id === action.payload.boardId);
      if (board) {
        const existingColumn = board.columns.find(
          (col) => col.id === action.payload.column.id
        );
        if (!existingColumn) {
          board.columns.push(action.payload.column);
        }
      }
    },
  },
});

export const {
  setBoards,
  addBoard,
  deleteBoard,
  clearBoards,
  updateBoardTitle,
  addColumnToBoard,
} = boardSlice.actions;
export default boardSlice.reducer;
