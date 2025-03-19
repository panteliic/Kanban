"use client";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useState, useEffect, useRef } from "react";
import Column from "./Column";
import api from "../utils/api"; // Assume you have an API utility to handle HTTP requests
import { setLoading } from "@/redux/LoadingSlice";
import { usePathname } from "next/navigation";

type Subtask = {
  id: string;
  content: string;
  completed?: boolean;
};

type Task = {
  id: string;
  content: string;
  subtasks: Subtask[];
};

type ColumnsData = {
  [key: string]: Task[];
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<ColumnsData>({});
  const [isDragging, setIsDragging] = useState(false);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchBoardData = async () => {
      const currentBoardId = pathname?.split("/").pop();
      try {
        setLoading(true);
        const response = await api.get(
          `/boards/getBoardData/${currentBoardId}`
        );
        const boardData = response.data;
        const columnsData: ColumnsData = {};

        boardData.columns.forEach((column: any) => {
          columnsData[column.name.toLowerCase()] = column.tasks.map(
            (task: any) => ({
              id: task.id,
              content: task.title,
              subtasks: task.subtasks.map((subtask: any) => ({
                id: subtask.id,
                content: subtask.title,
                completed: subtask.completed,
              })),
            })
          );
        });

        setTasks(columnsData);
      } catch (error) {
        console.error("Error fetching board data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardData();
  }, []);

  const onDragStart = () => {
    setIsDragging(true);
  };

  const onDragEnd = (result: DropResult) => {
    setIsDragging(false);
    const { source, destination } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const startColumn = [...tasks[source.droppableId]];
    const endColumn = [...tasks[destination.droppableId]];
    const [movedTask] = startColumn.splice(source.index, 1);
    endColumn.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: startColumn,
      [destination.droppableId]: endColumn,
    });
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div
        className={`bg-secondary overflow-x-auto cursor-move select-none ${
          isDragging ? "overflow-hidden" : ""
        }`}
        ref={boardRef}
      >
        <div className="h-[calc(100vh-6rem)] overflow-auto">
          <div className="flex gap-4 flex-nowrap w-max overflow-auto p-6 h-screen">
            {Object.keys(tasks).map((columnId) => (
              <Column
                key={columnId}
                columnId={columnId}
                columnName={columnId.toUpperCase()}
                tasks={tasks[columnId]}
              />
            ))}
            {Object.keys(tasks).length < 5 && (
              <div className="w-80 h-screen p-4">
                <div className="w-full h-screen text-muted-foreground text-3xl font-semibold rounded-md p-4 bg-gradient-to-b from-background to-secondary flex items-center justify-center cursor-pointer ">
                  + New Column
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
