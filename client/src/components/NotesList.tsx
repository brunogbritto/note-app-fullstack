import { Note } from "./Note";
import AddNote from "./AddNote";

export type Notepad = {
  notes: {
    id: string;
    title: string;
    subtitle: string;
    content: string;
    created_at: string;
  }[];
  handleAddNote: (noteText: string) => void;
  handleDeleteNote: (noteText: string) => void;
};

export type NotesListProps = {
  notepads: Notepad[];
};

const NotesList = ({ notes, handleAddNote, handleDeleteNote }: Notepad) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          subtitle={note.subtitle}
          content={note.content}
          createdAt={note.created_at}
          handleDeleteNote={handleDeleteNote}
        />
      ))}
      <div>
        <AddNote handleAddNote={handleAddNote} />
      </div>
    </div>
  );
};

export { NotesList };
