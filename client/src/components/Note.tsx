import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

interface NoteProps {
  id: string;
  title: string;
  createdAt: string;
  subtitle: string;
  content: string;
  handleDeleteNote: (noteText: string) => void;
}

const Note = ({
  id,
  title,
  subtitle,
  content,
  createdAt,
  handleDeleteNote,
}: NoteProps) => {
  return (
    <div className="bg-yellow-400 rounded-2xl p-4 max-h-full flex flex-col justify-between whitespace-pre-wrap placeholder-black">
      <Link to={`/notepads/${id}`} key={id}>
        <div className="font-bold">
          <span>{title}</span>
        </div>
        <div className="italic">
          <span>{subtitle}</span>
        </div>
        <div>
          <span>{content}</span>
        </div>
      </Link>
      <div className="flex items-center justify-between mt-7">
        <div className="text-gray-700">
          <time dateTime={createdAt}>
            Criado em {new Date(createdAt).toLocaleDateString()}
          </time>
        </div>
        <MdDeleteForever
          className="cursor-pointer w-6 h-6"
          onClick={() => handleDeleteNote(id)}
        />
      </div>
    </div>
  );
};

export { Note };
