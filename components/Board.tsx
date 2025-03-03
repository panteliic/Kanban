'use client'
import { DragDropContext } from "@hello-pangea/dnd";
import { useState } from "react";
import Column from "./Column";

type Task = {
  id: string;
  content: string;
};

type ColumnsData = {
  [key: string]: Task[]; 
};

const initialData: ColumnsData = {
  todo: [
    { id: "1", content: "Task 1" },
    { id: "2", content: "Task 2" },
    { id: "5", content: "Task 1" },
    { id: "6", content: "Task 2" },
    { id: "7", content: "Task 1" },
    { id: "8", content: "Task 2" },
    { id: "9", content: "Task 1" },
    { id: "10", content: "Task 2" },
    { id: "11", content: "Task 1" },
    { id: "12", content: "Task 2" },
  ],
  doing: [{ id: "3", content: "Task 3" }],
  done: [{ id: "4", content: "Task 4" }],
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<ColumnsData>(initialData);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const startColumn = tasks[source.droppableId];
    const endColumn = tasks[destination.droppableId];
    const [movedTask] = startColumn.splice(source.index, 1);
    endColumn.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: startColumn,
      [destination.droppableId]: endColumn,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-6 flex max-h-screen w-full overflow-x-auto">
        <div className="flex gap-6 flex-col lg:flex-row w-full"> 
          {Object.keys(tasks).map((columnId) => (
            <Column
              key={columnId}
              columnId={columnId}
              columnName={columnId.toUpperCase()}
              tasks={tasks[columnId]}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
