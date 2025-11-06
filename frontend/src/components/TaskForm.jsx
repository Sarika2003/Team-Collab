import { useState } from "react";

export default function TaskForm({ onSave, onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "To Do",
    priority: "Low",
    assignedTo: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-80">
      <h2 className="text-lg font-semibold mb-3">Create Task</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            type={key === "dueDate" ? "date" : "text"}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="border p-2 rounded text-sm"
          />
        ))}
        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-800"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border border-gray-300 px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
