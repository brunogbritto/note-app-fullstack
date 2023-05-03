import React from "react";

export type TextAreaProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

const TextArea = ({ value, placeholder, onChange }: TextAreaProps) => {
  return (
    <div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="bg-yellow-400 hover:bg-yellow-400 outline-none w-full whitespace-pre-wrap resize-none placeholder-gray-700"
        placeholder={placeholder}
        rows={4}
      ></textarea>
    </div>
  );
};

export { TextArea };
