import React from "react";

export type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title?: string;
};

const Button = ({ onClick, title }: ButtonProps) => {
  return (
    <button
      className="bg-green-600 rounded-2xl w-[150px] font-bold text-slate-200 hover:bg-green-500 p-2 mt-6"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export { Button };
