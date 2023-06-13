import React from "react";

export type TextAreaProps = {
  value?: string;
  placeholder: string;
  onChange?: (value: string) => void;
  rows?: number;
  name?: string;
  className?: string;
};

const TextArea = ({
  value,
  placeholder,
  onChange,
  className = "",
  name,
  rows = 3,
}: TextAreaProps) => {
  return (
    <div>
      <textarea
        value={value}
        name={name}
        onChange={
          onChange ? (event) => onChange(event.target.value) : undefined
        }
        className={`bg-yellow-400 hover:bg-yellow-400 outline-none w-full whitespace-pre-wrap resize-none placeholder-gray-700 ${className}`}
        placeholder={placeholder}
        rows={4}
      ></textarea>
    </div>
  );
};

export { TextArea };
