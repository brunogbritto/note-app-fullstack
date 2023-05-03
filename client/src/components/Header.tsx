import { LinkButton } from "./LinkButton";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center gap-6">
      <Link to="/">
        <h1 className="font-bold text-3xl mt-5">NoteAPP</h1>
      </Link>
      <Link
        to="/"
        className="text-blue-500 hover:text-blue-700 font-bold text-md mt-6 hidden md:block"
      >
        Página Inicial
      </Link>
      <div className="ml-auto mt-5 ">
        <LinkButton to="/criar-note">Criar Note</LinkButton>
      </div>
    </div>
  );
};

export { Header };
