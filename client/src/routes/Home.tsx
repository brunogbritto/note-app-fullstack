import { Search } from "../components/Search";
import { NotesList } from "../components/NotesList";
import { PaginationButtons } from "../components/PaginationButtons";
import { useState, useEffect } from "react";
import { getNotepads, GetNotepadsOutput } from "../api/getNotepads";
import { nanoid } from "nanoid";
import { config } from "../config";

const pageSize = config.pageSize;

interface Note {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  created_at: string;
  count: number;
}

interface Notepad {
  count: number;
  notepads: Note[];
}

const initialNotepadList: Notepad = {
  count: 0,
  notepads: [],
};

const Home = () => {
  const [notes, setNotes] = useState<Notepad>(initialNotepadList);
  const [isLoading, setIsLoading] = useState(true);
  const loadingText = isLoading ? "Loading..." : "";
  const pageCount = Math.ceil(notes.count / pageSize);

  useEffect(() => {
    setIsLoading(true);
    getNotepads().then((response: GetNotepadsOutput) => {
      const { notepads } = response;
      console.log(response);
      const convertedNotes: Note[] = Array.isArray(notepads)
        ? notepads.map((notepad) => ({
            id: notepad.id?.toString() ?? nanoid(),
            title: notepad.title,
            subtitle: notepad.subtitle,
            content: notepad.content,
            created_at: notepad.created_at,
            count: notepads.length,
          }))
        : [];
      setNotes((prevState) => ({
        ...prevState,
        count: convertedNotes.length,
        notepads: convertedNotes,
      }));
      setIsLoading(false);
    });
  }, []);

  const [searchText, setSearchText] = useState("");

  const AddNote = (text: string) => {
    const date = new Date();
    const newNote: Note = {
      id: nanoid(),
      title: text,
      subtitle: text,
      content: text,
      created_at: date.toLocaleDateString(),
      count: notes.count + 1,
    };

    const newNotes = {
      ...notes,
      count: notes.count + 1,
      notepads: [...notes.notepads, newNote],
    };
    setNotes(newNotes);
  };

  const deleteNote = (id: string) => {
    const newNotes = notes.notepads.filter((note) => note.id !== id);
    setNotes((prevState) => ({
      ...prevState,
      count: prevState.count - 1,
      notepads: newNotes,
    }));
  };

  return (
    <div>
      <div>{loadingText}</div>
      <Search handleSearchNote={setSearchText} />
      <NotesList
        notes={notes.notepads.filter(
          (note) =>
            (note.content &&
              note.content.toLowerCase().includes(searchText.toLowerCase())) ||
            (note.title &&
              note.title.toLowerCase().includes(searchText.toLowerCase())) ||
            (note.subtitle &&
              note.subtitle.toLowerCase().includes(searchText.toLowerCase()))
        )}
        handleAddNote={AddNote}
        handleDeleteNote={deleteNote}
      />
      <PaginationButtons
        pageCount={pageCount}
        getLink={(page) => `/notepads/page/${page}`}
      />
    </div>
  );
};

export { Home };
