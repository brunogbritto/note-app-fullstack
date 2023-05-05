import { Search } from "../components/Search";
import { NotesList } from "../components/NotesList";
import { useState, useEffect } from "react";
import { api } from "../api";
import { nanoid } from "nanoid";

interface Note {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  created_at: string;
}

async function getNotepads() {
  const res = await api.get("/notepads");
  const notepads = res.data;
  return notepads;
}

const initialNotepads: Note[] = [];

const Home = () => {
  const [notes, setNotes] = useState<Note[]>(initialNotepads);
  const [isLoading, setIsLoading] = useState(true);
  const loadingText = isLoading ? "Loading..." : "";

  useEffect(() => {
    setIsLoading(true);
    getNotepads().then((notes) => {
      setNotes(notes);
      setIsLoading(false);
    });
  }, []);

  const [searchText, setSearchText] = useState("");

  const AddNote = (text: string) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      title: text,
      subtitle: text,
      content: text,
      created_at: date.toLocaleDateString(),
    };

    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id: string) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div>
      <div>{loadingText}</div>
      <Search handleSearchNote={setSearchText} />
      <NotesList
        notes={notes.filter(
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
    </div>
  );
};

export { Home };
