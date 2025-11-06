export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-lg font-bold text-gray-500"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
