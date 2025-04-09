import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-xl w-full"
    >
      {children}
    </button>
  );
};

export default Button;
