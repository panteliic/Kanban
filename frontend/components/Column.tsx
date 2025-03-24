import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import {  ColumnProps } from "@/types"; 

const getStatusColor = (columnName: string): string => {
  const statusColors: Record<string, string> = {
    todo: "bg-blue-500",
    doing: "bg-yellow-500",
    done: "bg-green-500",
  };

  return statusColors[columnName.toLowerCase()] || getRandomColor();
};

const getRandomColor = (): string => {
  const randomColors = ["bg-red-500", "bg-purple-500"];
  return randomColors[Math.floor(Math.random() * randomColors.length)];
};

const Column = ({ columnId, columnName, tasks }: ColumnProps) => {
  const statusColor = getStatusColor(columnName);

  return (
    <Droppable droppableId={String(columnId)}>
      {(provided) => (
        <div
          className={`w-96 text-foreground rounded-md p-2 ${
            tasks.length === 0 ? "border-dashed border-2" : "border-none"
          } bg-secondary`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-3 h-3 rounded-full ${statusColor}`} />
            <h2 className="font-bold text-[#828fa3]">{columnName}</h2>
          </div>
          {tasks &&
            tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                subtasks={task.subtasks}
                index={index}
              />
            ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
