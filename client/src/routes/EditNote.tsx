import { TextField } from "../components/TextField";
import { TextArea } from "../components/TextArea";
import { Breadcrumbs } from "../components/Breadcrumbs";
import toast from "react-simple-toasts";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";

const initialCreateNote = {
  title: "",
  subtitle: "",
  content: "",
};

const EditNote = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(initialCreateNote);

  useEffect(() => {
    api.get(`/notepads/${params.id}`).then((results) =>
      setNote({
        title: results.data.title,
        subtitle: results.data.subtitle,
        content: results.data.content,
      })
    );
  });

  return (
    <div className="mt-3">
      <Breadcrumbs
        links={[
          { title: "Página Inicial", link: "/" },
          { title: note.title, link: `/notepads/${params.id}` },
        ]}
      />
      <div className="bg-yellow-400 rounded-2xl p-4 mx-auto m-8 shadow-xl w-2/3 h-auto md:mx-auto md:max-w-screen-md">
        <form
          className="flex flex-col gap-2 mx-2"
          noValidate
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await api.put(`/notepads/${params.id}`, note);
            if (response.data.success) {
              toast("O seu note foi editado com sucesso!");
              navigate("/");
            } else {
              toast("Houve um erro ao editar o seu note!");
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
    </div>
  );
};

export { EditNote };
