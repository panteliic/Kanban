import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Board {
  id: string;
  title: string;
}

interface BoardState {
  boards: Board[];
}

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
      state.boards = state.boards.filter((board) => board.id !== action.payload);
    },
    clearBoards: (state) => {
      state.boards = [];
    },
  },
});

export const { setBoards, addBoard, deleteBoard, clearBoards } = boardSlice.actions;
export default boardSlice.reducer;
