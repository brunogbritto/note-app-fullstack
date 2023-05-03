import { useState } from "react";

interface Props {
  handleAddNote: (noteText: string) => void;
}

const AddNote = ({ handleAddNote }: Props) => {
  const [noteText, setNoteText] = useState("");
  const characterLimit = 200;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (characterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value);
    }
  };

  const handleSaveClick = () => {
    if (noteText.trim().length > 0) {
      handleAddNote(noteText);
      setNoteText("");
    }
  };
  return (
    <div className="bg-green-600 rounded-2xl p-4 h-48 flex flex-col justify-between">
      <textarea
        className="bg-green-600 h-2/3 resize-none border-none text-zinc-50 placeholder-zinc-50"
        placeholder="Escreva sua anotação aqui..."
        value={noteText}
        onChange={handleChange}
      ></textarea>
      <div className="flex items-center justify-between">
        <small className="text-zinc-50">
          {characterLimit - noteText.length} caractéres restantes
        </small>
        <button
          onClick={handleSaveClick}
          className="text-black bg-zinc-300 rounded-3xl px-2 py-1"
        >
          Save
        </button>
      </div>
    </div>
  );
};
export default AddNote;
