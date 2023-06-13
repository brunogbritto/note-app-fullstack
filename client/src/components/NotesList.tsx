import { Note } from "./Note";
import AddNote from "./AddNote";

export interface NoteData {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  created_at: string;
  count: number;
}

export interface NotesListProps {
  notes: NoteData[];
  handleAddNote: (noteText: string) => void;
  handleDeleteNote: (id: string) => void;
}

const NotesList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
}: NotesListProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          subtitle={note.subtitle}
          content={note.content}
          created_at={note.created_at}
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
