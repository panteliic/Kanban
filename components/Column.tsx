import Task from "./TaskCard";

const tasks = [
  { id: "task-1", content: "Task 1" },
  { id: "task-2", content: "Task 2" },
  { id: "task-3", content: "Task 3" },
];

export default function Column({ id }: { id: string }) {
  return (
    <div className="w-1/3  p-4 rounded-md">
      <h3 className="font-bold mb-4">{id}</h3>
      <div className="space-y-4"> 
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
