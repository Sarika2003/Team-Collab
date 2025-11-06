import TaskCard from "./TaskCard";

export default function BoardView({ tasks = [], onAddTask, onDelete }) {
  const columns = ["To Do", "In Progress", "Done"];

  return (
    <div className="flex gap-4 p-4 flex-1 overflow-auto">
      {columns.map((col) => (
        <div key={col} className="flex-1 bg-white rounded-xl shadow p-3">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">{col}</h3>
            <button
              onClick={() => onAddTask(col)}
              className="text-sm bg-primary text-white px-2 py-1 rounded"
            >
              + Add
            </button>
          </div>
          {tasks
            .filter((t) => t.status === col)
            .map((t) => (
              <TaskCard key={t._id} task={t} onDelete={onDelete} />
            ))}
        </div>
      ))}
    </div>
  );
}
