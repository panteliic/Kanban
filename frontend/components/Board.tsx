"use client";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useState, useEffect, useRef } from "react";
import Column from "./Column";
import { setLoading } from "@/redux/LoadingSlice";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { moveTask, setTasksData } from "@/redux/taskSlice";
import { fetchBoardData } from "@/utils/fetchBoardData";
import { updateTaskColumn } from "@/utils/updateTaskColumn";
const KanbanBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const [, setIsDragging] = useState(false);
  const [isBoardBeingDragged, setIsBoardBeingDragged] = useState(false);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const scrollStart = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const boardData = await fetchBoardData(pathname);
        dispatch(setTasksData(boardData));
      } catch (error) {
        console.error("Error fetching board data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pathname]);

  const onDragStart = () => {
    setIsDragging(true);
  };
  const onDragEnd = async (result: DropResult) => {
    setIsDragging(false);
    const { source, destination } = result;
  
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
  
    const taskId = tasks[source.droppableId].tasks[source.index].id;
    const sourceColumnId = source.droppableId;
    const destinationColumnId = destination.droppableId;
  

    dispatch(
      moveTask({
        taskId,
        sourceColumnId,
        destinationColumnId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
    try {
      await updateTaskColumn(taskId, destinationColumnId);  
    } catch (error) {
      console.error("Error updating task column on the server:", error);
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
