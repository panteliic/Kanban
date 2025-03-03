
function Task({ task }: { task: { id: string; content: string } }) {
  return (
    <div className="p-2  border rounded shadow-md">{task.content}</div>
  );
}
export default Task;
