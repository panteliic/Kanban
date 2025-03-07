"use client";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useState, useRef } from "react";
import Column from "./Column";

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

const initialData: ColumnsData = {
  todo: [
    {
      id: "1",
      content: "Task 1",
      subtasks: [
        { id: "1-1", content: "Subtask 1" },
        { id: "1-2", content: "Subtask 2" },
      ],
    },
    {
      id: "2",
      content: "Task 2",
      subtasks: [{ id: "2-1", content: "Subtask 1" }],
    },
    { id: "5", content: "Task 3", subtasks: [] },
    { id: "6", content: "Task 4", subtasks: [] },
  ],
  doing: [{ id: "3", content: "Task 5", subtasks: [] }],
  done: [
    {
      id: "4",
      content: "Task 6",
      subtasks: [{ id: "4-1", content: "Subtask 1" }],
    },
  ],
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<ColumnsData>(initialData);
  const [isDragging, setIsDragging] = useState(false);
  const boardRef = useRef<HTMLDivElement | null>(null);

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
        className={`bg-secondary overflow-x-auto cursor-move select-none ${isDragging ? "overflow-hidden" : ""}`}
        ref={boardRef}
      >
        <div className="h-[calc(100vh-6rem)]">
          <div className="flex gap-4 flex-nowrap w-max p-6">
            {Object.keys(tasks).map((columnId) => (
              <Column
                key={columnId}
                columnId={columnId}
                columnName={columnId.toUpperCase()}
                tasks={tasks[columnId]}
              />
            ))}
            <div className="w-80 h-screen p-4">
              <div className="w-full h-screen text-muted-foreground text-3xl font-semibold rounded-md p-4 bg-gradient-to-b from-background to-secondary flex items-center justify-center cursor-pointer ">
                + New Column
              </div>
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
