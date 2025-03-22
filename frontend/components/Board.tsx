"use client";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useState, useEffect, useRef } from "react";
import Column from "./Column";
import api from "../utils/api";
import { setLoading } from "@/redux/LoadingSlice";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setTasksData } from "@/redux/taskSlice";

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
  id: string;
  name: string;
  tasks: Task[];
}

interface BoardData {
  columns: ColumnData[];
}
interface Column {
  id: string;
  name: string;
}
type ColumnsData = {
  [columnId: string]: {
    column: Column;
    tasks: Task[];
  };
};

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const [, setIsDragging] = useState(false);
  const [isBoardBeingDragged, setIsBoardBeingDragged] = useState(false);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const scrollStart = useRef(0);

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
          columnsData[column.id] = {
            column: {
              id: column.id,
              name: column.name,
            },
            tasks: column.tasks.map((task: Task) => ({
              id: task.id,
              title: task.title,
              subtasks: task.subtasks.map((subtask: Subtask) => ({
                id: subtask.id,
                title: subtask.title,
                completed: subtask.completed,
              })),
            })),
          };
        });
        dispatch(setTasksData(columnsData));
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
  const onDragEnd = async (result: DropResult) => {
    setIsDragging(false);
    const { source, destination } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const updatedTasks = { ...tasks };

    const startColumnData = { ...updatedTasks[source.droppableId] };
    const endColumnData =
      source.droppableId === destination.droppableId
        ? startColumnData
        : { ...updatedTasks[destination.droppableId] };

    const startTasks = [...startColumnData.tasks];
    const endTasks =
      source.droppableId === destination.droppableId
        ? startTasks
        : [...endColumnData.tasks];

    const [movedTask] = startTasks.splice(source.index, 1);
    endTasks.splice(destination.index, 0, movedTask);

    startColumnData.tasks = startTasks;
    endColumnData.tasks = endTasks;

    dispatch(
      setTasksData({
        ...tasks,
        [source.droppableId]: startColumnData,
        [destination.droppableId]: endColumnData,
      })
    );

    try {
      await api.put(`/task/updateTask/${movedTask.id}`, {
        newColumnId: destination.droppableId,
      });
    } catch (error) {
      console.error("Error updating task column:", error);
    }
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsBoardBeingDragged(true);
    scrollStart.current = e.clientX;
    document.body.style.cursor = "grabbing";
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isBoardBeingDragged && boardRef.current) {
      const movementX = e.clientX - scrollStart.current;
      boardRef.current.scrollLeft -= movementX;
      scrollStart.current = e.clientX;
    }
  };

  const onMouseUp = () => {
    setIsBoardBeingDragged(false);
    document.body.style.cursor = "default";
  };

  const onMouseLeave = () => {
    setIsBoardBeingDragged(false);
    document.body.style.cursor = "default";
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div
        ref={boardRef}
        className="bg-secondary overflow-x-auto cursor-grab select-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <div className="h-[calc(100vh-6rem)]">
          <div className="flex gap-4 flex-nowrap w-max p-6 h-screen">
            {Object.keys(tasks).map((columnId) => (
              <Column
                key={columnId}
                columnId={columnId}
                columnName={tasks[columnId].column.name.toUpperCase()}
                tasks={tasks[columnId].tasks}
              />
            ))}
            {Object.keys(tasks).length < 5 && (
              <div className="w-80 h-screen p-4">
                <div className="w-full h-screen text-muted-foreground text-3xl font-semibold rounded-md p-4 bg-gradient-to-b from-background to-secondary flex items-center justify-center cursor-pointer">
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
