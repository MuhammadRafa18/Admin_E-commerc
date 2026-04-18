import React from "react";

export const ButtonCreate = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-fit bg-green-500 text-white py-2.5 px-5 rounded-xl cursor-pointer relative overflow-x-auto"
    >
      {text}
    </button>
  );
};
