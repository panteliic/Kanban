"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setLoading } from "@/redux/LoadingSlice";
import { setBoards } from "@/redux/boardSlice";
import api from "@/utils/api";

function CreateNewBoard() {
  const [title, setTitle] = useState("");
  const [columns, setColumns] = useState<string[]>([""]); 
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;

  if (!userId) return null;

  const handleColumnChange = (index: number, value: string) => {
    const newColumns = [...columns];
    newColumns[index] = value;
    setColumns(newColumns);
  };

  const addColumn = () => {
    if (columns.length < 2) {
      setColumns([...columns, ""]); 
    }
  };

  const createBoard = async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.post(`/boards/create`, {
        title,
        columns: columns.filter(col => col.trim() !== ""), 
        userId,
      });

      dispatch(setBoards(data)); 
    } catch (err) {
      console.error("Error creating board:", err);
    } finally {
      dispatch(setLoading(false));
      setTitle("");
      setColumns([""]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <h3 className="text-primary text-lg flex items-center gap-2 font-medium px-5 py-3 capitalize cursor-pointer hover:opacity-70 transition">
          <Image
            src={"/assets/icon-blue-board.svg"}
            alt="board logo"
            width={100}
            height={100}
            className="w-5"
          />
          + create new board
        </h3>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Board</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4">
          <div>
            <label className="font-semibold">Name</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter board name"
              required
            />
          </div>
          <div>
            <label className="font-semibold">Columns</label>
            {columns.map((col, index) => (
              <Input
                key={index}
                type="text"
                value={col}
                onChange={(e) => handleColumnChange(index, e.target.value)}
                placeholder={`Column ${index + 1}`}
                className="mt-2"
              />
            ))}
          </div>
          <div>
            {columns.length < 2 && (
              <Button
                type="button"
                onClick={addColumn}
                className="text-primary bg-primary-foreground mt-2 w-full"
              >
                + Add new column
              </Button>
            )}
            <Button
              type="button"
              onClick={createBoard}
              className="bg-primary text-primary-foreground mt-4 w-full"
            >
              Create New Board
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNewBoard;
