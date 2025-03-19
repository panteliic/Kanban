"use client";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useState, useEffect, useRef } from "react";
import Column from "./Column";
import api from "../utils/api"; 
import { setLoading } from "@/redux/LoadingSlice";
import { usePathname } from "next/navigation";

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

interface ColumnData {
  name: string;
  tasks: Task[];
}

interface BoardData {
  columns: ColumnData[];
}

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
        const response = await api.get<BoardData>(
          `/boards/getBoardData/${currentBoardId}`
        );
        const boardData = response.data;
        const columnsData: ColumnsData = {};

        boardData.columns.forEach((column: ColumnData) => {
          columnsData[column.name.toLowerCase()] = column.tasks.map((task: Task) => ({
            id: task.id,
            title: task.title,
            subtasks: task.subtasks.map((subtask: Subtask) => ({
              id: subtask.id,
              title: subtask.title,
              completed: subtask.completed,
            })),
          }));
        });

        setTasks(columnsData);
      } catch (error) {
        console.error("Error fetching board data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoardData();
  }, [pathname]);

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
  console.log(tasks);
  
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
