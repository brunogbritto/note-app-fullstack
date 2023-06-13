import React from "react";

export type TextFieldProps = {
  value?: string;
  placeholder: string;
  onChange?: (value: string) => void;
  name?: string;
  className?: string;
};

const TextField = ({
  value,
  placeholder,
  onChange,
  name,
  className = "",
}: TextFieldProps) => {
  return (
    <div>
      <input
        value={value}
        name={name}
        onChange={
          onChange ? (event) => onChange(event.target.value) : undefined
        }
        className={`bg-yellow-400 hover:bg-yellow-400 outline-none w-full whitespace-pre-wrap placeholder-gray-700 ${className}`}
        type="text"
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export { TextField };
