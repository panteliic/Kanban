import { SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./TaskCard";

type ColumnProps = {
  id: string;
  tasks: { id: string; content: string }[];
};

export default function Column({ id, tasks }: ColumnProps) {
  return (
    <div className="w-64 p-4 bg-gray-200 rounded-lg">
      <h2 className="font-bold text-lg capitalize">{id}</h2>
      <SortableContext items={tasks.map((task) => task.id)}>
        {tasks.map((task) => (
          <SortableItem key={task.id} id={task.id} content={task.content} />
        ))}
      </SortableContext>
    </div>
  );
}