import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import BoardView from "../components/BoardView";
import Modal from "../components/Modal";
import TaskForm from "../components/TaskForm";
import axiosInstance from "../utils/axios";

export default function Home() {
  const [boards, setBoards] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/boards");
        setBoards(res.data.data || []);
      } catch (err) {
        console.error("Error fetching boards:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBoards();
  }, []);


  useEffect(() => {
    if (!selectedBoard) return;

    const fetchTasks = async () => {
      try {
        const res = await axiosInstance.get(`/tasks?boardId=${selectedBoard._id}`);
        setTasks(res.data.data || []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, [selectedBoard]);


  const handleCreateTask = async (taskData) => {
    try {
      await axiosInstance.post(`/tasks`, {
        ...taskData,
        boardId: selectedBoard._id,
      });
      setShowModal(false);


      const res = await axiosInstance.get(`/tasks?boardId=${selectedBoard._id}`);
      setTasks(res.data.data || []);
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };


  const handleDeleteTask = async (id) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <Sidebar boards={boards} onSelect={setSelectedBoard} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedBoard ? (
          <BoardView
            tasks={tasks}
            onAddTask={() => setShowModal(true)}
            onDelete={handleDeleteTask}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            {loading ? "Loading boards..." : "Select a board to view tasks"}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <TaskForm
            onSave={handleCreateTask}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}
