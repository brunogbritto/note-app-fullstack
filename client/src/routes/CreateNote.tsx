import { TextField } from "../components/TextField";
import { TextArea } from "../components/TextArea";
import toast from "react-simple-toasts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

const initialCreateNote = {
  title: "",
  subtitle: "",
  content: "",
};

const CreateNote = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState(initialCreateNote);
  return (
    <div className="bg-yellow-400 rounded-2xl p-4 mx-auto m-8 shadow-xl w-2/3 h-auto md:mx-auto md:max-w-screen-md">
      <form
        className="flex flex-col gap-2 mx-2"
        noValidate
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await api.post("/notepads", note);
          if (response.data.success) {
            toast("O seu note foi criado com sucesso!");
            navigate("/");
          } else {
            toast("Houve um erro ao criar o seu note!");
          }
        }}
      >
        <TextField
          placeholder="Digite o título"
          value={note.title}
          onChange={(title) => setNote({ ...note, title })}
        />
        <TextField
          placeholder="Digite o subtítulo"
          value={note.subtitle}
          onChange={(subtitle) => setNote({ ...note, subtitle })}
        />
        <TextArea
          placeholder="Digite sua anotação aqui..."
          value={note.content}
          onChange={(content) => setNote({ ...note, content })}
        />
        <button
          type="submit"
          className="bg-green-600 rounded-2xl w-[150px] font-bold text-slate-200 hover:bg-green-500 p-2 mt-6"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export { CreateNote };
