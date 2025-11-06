export default function TaskCard({ task, onDelete }) {
  return (
    <div className="bg-accent rounded p-2 mb-2 text-sm shadow cursor-pointer">
      <div className="flex justify-between">
        <span className="font-semibold">{task.title}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task._id);
          }}
          className="text-red-600 font-bold"
        >
          ×
        </button>
      </div>
      <p className="text-xs text-gray-700">{task.description}</p>
      <p className="text-xs">👤 {task.assignedTo}</p>
      <p className="text-xs">📅 {new Date(task.dueDate).toLocaleDateString()}</p>
    </div>
  );
}
