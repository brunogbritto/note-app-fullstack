import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { LinkButton } from "../components/LinkButton";
import { api } from "../api/api";
import toast from "react-simple-toasts";

const ViewNote = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({
    id: params.id,
    title: "",
    subtitle: "",
    content: "",
    created_at: "",
  });

  useEffect(() => {
    api.get(`notepads/${params.id}`).then((res) => {
      const notepad = res.data;
      setNote(notepad);
    });
  });
  return (
    <div className="mt-3">
      <Breadcrumbs
        links={[
          { title: "Página Inicial", link: "/" },
          { title: note.title, link: `/notepads/${params.id}` },
        ]}
      />
      <div className="bg-yellow-400 rounded-2xl p-4 max-h-full flex flex-col justify-between whitespace-pre-wrap h-auto m-8 shadow-xl md:mx-auto md:max-w-screen-md">
        <span>#{params.id}</span>
        <h1 className="font-bold">{note.title}</h1>
        <p className="italic">{note.subtitle}</p>
        <p>{note.content}</p>
        <div className="flex flex-row gap-2 items-center justify-between mt-4">
          <time dateTime={note.created_at} className="mt-7 text-gray-700">
            Criado em {new Date(note.created_at).toLocaleDateString()}
          </time>
          <button
            className="bg-red-500 hover:bg-red-700 rounded-2xl w-[150px] font-bold text-slate-200 p-2 mt-6 ml-[250px]"
            onClick={async () => {
              const res = await api.delete(`/notepads/${params.id}`);
              const deleteNoteResponse = res.data;

              if (deleteNoteResponse.success) {
                toast("O notepad foi deletado com sucesso!");
                navigate("/");
              } else {
                toast(
                  "Houve um erro ao deletar seu note. Tente novamente mais tarde."
                );
              }
            }}
          >
            Deletar
          </button>
          <LinkButton to={`/notepads/editar/${params.id}`}>Editar</LinkButton>
        </div>
      </div>
    </div>
  );
};

export { ViewNote };
