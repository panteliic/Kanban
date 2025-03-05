import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

type Subtask = {
  id: string;
  content: string;
  completed?: boolean;
};

type Task = {
  id: string;
  content: string;
  subtasks: Subtask[];
  index?: number;  
};

type ColumnProps = {
  columnId: string;
  columnName: string;
  tasks: Task[];
};

const getStatusColor = (columnName: string) => {
  const randomColors = [
    "bg-red-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-indigo-500",
    "bg-orange-500",
  ];

  switch (columnName.toLowerCase()) {
    case "todo":
      return "bg-blue-500";
    case "doing":
      return "bg-yellow-500";
    case "done":
      return "bg-green-500";
    default:
      return randomColors[Math.floor(Math.random() * randomColors.length)];
  }
};

const Column = ({ columnId, columnName, tasks }: ColumnProps) => {
  const statusColor = getStatusColor(columnName);

  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          className="w-96 text-foreground rounded-md p-4 bg-secondary"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-3 h-3 rounded-full ${statusColor}`} />
            <h2 className="font-bold text-[#828fa3]">{columnName}</h2>
          </div>
          {tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              id={task.id}
              content={task.content}
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
