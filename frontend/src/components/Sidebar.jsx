import { useState } from "react";
import axiosInstance from "../utils/axios";

export default function Sidebar({ boards = [], onSelect }) {
  const [showForm, setShowForm] = useState(false);
  const [boardName, setBoardName] = useState("");

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (!boardName.trim()) return;
    try {
      await axiosInstance.post("/boards", { name: boardName });
      window.location.reload(); 
    } catch (err) {
      console.error("Error creating board:", err);
    }
  };

  return (
    <div className="w-64 bg-primary text-white h-screen p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
        Boards
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center font-bold"
          title="Create Board"
        >
          +
        </button>
      </h2>

      {/* Create Board Form */}
      {showForm && (
        <form onSubmit={handleCreateBoard} className="mb-4">
          <input
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="Board name"
            className="w-full p-2 rounded text-gray-800 mb-2"
          />
          <button
            type="submit"
            className="bg-white text-primary w-full py-1 rounded font-semibold hover:bg-gray-100"
          >
            Create
          </button>
        </form>
      )}

      <ul className="overflow-auto flex-1">
        {boards.length > 0 ? (
          boards.map((b) => (
            <li
              key={b._id}
              onClick={() => onSelect(b)}
              className="p-2 hover:bg-accent rounded cursor-pointer mb-1"
            >
              {b.name}
            </li>
          ))
        ) : (
          <p className="text-gray-300 text-sm">No boards found</p>
        )}
      </ul>
    </div>
  );
}
