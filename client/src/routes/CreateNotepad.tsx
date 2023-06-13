import { TextField } from "../components/TextField";
import { TextArea } from "../components/TextArea";
import { ErrorMessage } from "../components/ErrorMessage";
import { createNotepadSchema } from "../createNotepad.schema";
import toast from "react-simple-toasts";
import { useZorm } from "react-zorm";
import { useNavigate } from "react-router-dom";
import { postNotepad } from "../api/postNotepad";
import { useGlobalStore } from "../useGlobalStore";
import { FiLoader } from "react-icons/fi";

const texts = {
  title: "Criar Notepad",
  createNotepadSuccess: "O notepad foi criado com sucesso!",
  createNotepadFailure: "Houve um erro ao criar o seu notepad.",
  titlePlaceholder: "Digite um título",
  subtitlePlaceholder: "Digite um subtítulo",
  contentPlaceholder: "Digite um conteúdo",
  submitButtonLabel: "Enviar",
};

export function CreateNotepad() {
  const navigate = useNavigate();
  const isLoading = useGlobalStore((state) => state.isLoading);
  const setIsLoading = useGlobalStore((state) => state.setIsLoading);
  const zo = useZorm("create-notepad", createNotepadSchema, {
    async onValidSubmit(event) {
      event.preventDefault();
      const notepad = event.data;
      setIsLoading(true);
      const response = await postNotepad(notepad);
      setIsLoading(false);
      if (response.success) {
        toast(texts.createNotepadSuccess);
        navigate("/");
      } else {
        toast(texts.createNotepadFailure);
      }
    },
  });

  const disabled = zo.validation?.success === false;

  return (
    <div className="bg-yellow-400 rounded-2xl p-4 mx-auto m-8 shadow-xl w-2/3 h-auto md:mx-auto md:max-w-screen-md">
      <form ref={zo.ref} className="flex flex-col gap-2 mx-2" noValidate>
        <TextField
          placeholder={texts.titlePlaceholder}
          name={zo.fields.title()}
          className={zo.errors.title("error")}
        />
        {zo.errors.title((error) => (
          <ErrorMessage message={error.message} />
        ))}
        <TextField
          placeholder={texts.subtitlePlaceholder}
          name={zo.fields.subtitle()}
          className={zo.errors.subtitle("error")}
        />
        {zo.errors.subtitle((error) => (
          <ErrorMessage message={error.message} />
        ))}
        <TextArea
          placeholder={texts.contentPlaceholder}
          name={zo.fields.content()}
          className={zo.errors.content("error")}
        />
        {zo.errors.content((error) => (
          <ErrorMessage message={error.message} />
        ))}
        <button
          disabled={disabled}
          type="submit"
          className="bg-green-600 disabled:bg-gray-400 rounded-2xl w-[150px] font-bold text-slate-200 hover:bg-green-500 p-2 mt-6"
        >
          {isLoading ? (
            <FiLoader className="inline text-white animate-spin text-lg" />
          ) : (
            texts.submitButtonLabel
          )}
        </button>
      </form>
    </div>
  );
}
