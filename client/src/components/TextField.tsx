import React from "react";

export type TextFieldProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

const TextField = ({ value, placeholder, onChange }: TextFieldProps) => {
  return (
    <div>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="bg-yellow-400 hover:bg-yellow-400 outline-none w-full whitespace-pre-wrap placeholder-gray-700"
        type="text"
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export { TextField };
