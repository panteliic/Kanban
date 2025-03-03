import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

type ColumnProps = {
  columnId: string;
  columnName: string;
  tasks: Array<{ id: string; content: string }>;
};

const Column = ({ columnId, columnName, tasks }: ColumnProps) => {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          className="w-full lg:w-96 text-foreground rounded-md"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2 className="font-bold mb-4">{columnName}</h2>
          {tasks.map((task, index) => (
            <TaskCard key={task.id} id={task.id} content={task.content} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
