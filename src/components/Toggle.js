export default function Toggle({ label, isActive, onChange }) {
    return (
      <div className="flex items-center justify-between">
        <span className="text-gray-700 font-medium">{label}</span>
        <button
          onClick={onChange}
          className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer ${
            isActive ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`h-4 w-4 bg-white rounded-full shadow-md transform ${
              isActive ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    );
  }
  