import { Draggable } from "@hello-pangea/dnd";

type TaskCardProps = {
  id: string;
  content: string;
  index: number;
};

const TaskCard = ({ id, content, index }: TaskCardProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="bg-background w-full p-4 mb-4 rounded-md shadow-md"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {content}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
