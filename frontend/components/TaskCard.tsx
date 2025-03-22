import { TaskCardType } from "@/types";
import { Draggable } from "@hello-pangea/dnd";

const TaskCard = ({ id, title, subtasks, index }: TaskCardType) => {
  const completedSubtasks = subtasks.filter(
    (subtask) => subtask.completed
  ).length;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="bg-background w-full p-4 mb-4 rounded-md shadow-md"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="text-foreground">{title}</div>

          <div className="mt-2 text-sm text-[#828fa3]">
            {completedSubtasks} of {subtasks.length} subtasks
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
