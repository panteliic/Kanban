'use client'
import { useState, useEffect } from "react";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import Column from "./Column";
import SortableItem from "./TaskCard";

const initialColumns = ["todo", "doing", "done"] as const;

type Task = {
  id: string;
  content: string;
};

type Columns = (typeof initialColumns)[number]

type TasksState = Record<Columns, Task[]>;

const initialTasks: TasksState = {
  todo: [
    { id: "1", content: "Task 1" },
    { id: "2", content: "Task 2" },
  ],
  doing: [{ id: "3", content: "Task 3" }],
  done: [{ id: "4", content: "Task 4" }],
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState([...initialColumns]);
  const [tasks, setTasks] = useState<TasksState>(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(null);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over) return;

    if (
      columns.includes(active.id as Columns) &&
      columns.includes(over.id as Columns)
    ) {
      setColumns((prev) =>
        arrayMove(
          prev,
          prev.indexOf(active.id as Columns),
          prev.indexOf(over.id as Columns)
        )
      );
      return;
    }

    let sourceColumn: Columns | undefined;
    let targetColumn: Columns | undefined;

    for (const column of columns) {
      if (tasks[column].some((task) => task.id === active.id)) {
        sourceColumn = column;
      }
      if (tasks[column].some((task) => task.id === over.id)) {
        targetColumn = column;
      }
    }

    if (!sourceColumn || !targetColumn || sourceColumn === targetColumn) return;

    setTasks((prev) => {
      const sourceTasks = [...prev[sourceColumn]];
      const targetTasks = [...prev[targetColumn]];

      const taskIndex = sourceTasks.findIndex((t) => t.id === active.id);
      if (taskIndex === -1) return prev;

      const [task] = sourceTasks.splice(taskIndex, 1);

      targetTasks.push(task);

      return {
        ...prev,
        [sourceColumn]: sourceTasks,
        [targetColumn]: targetTasks,
      };
    });
  }

  if (!isClient) {
    return null;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex space-x-4 p-4">
        <SortableContext items={columns}>
          {columns.map((column) => (
            <Column key={column} id={column} tasks={tasks[column]} />
          ))}
        </SortableContext>
      </div>
      <DragOverlay>
        {activeId ? <SortableItem id={activeId} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
