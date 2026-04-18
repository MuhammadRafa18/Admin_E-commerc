// components/ButtonToggle.jsx
export const ButtonToggle = ({ isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none
                ${isActive ? "bg-blue-500" : "bg-gray-300"}`}
    >
      <span
        className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300
                    ${isActive ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  );
};
