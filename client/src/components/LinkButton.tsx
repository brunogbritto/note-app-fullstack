import React from "react";
import { Link } from "react-router-dom";

interface Props {
  children: string;
  to: string;
}

const LinkButton = (props: Props) => {
  return (
    <Link
      to={props.to}
      className="bg-green-600 rounded-2xl w-[150px] font-bold text-slate-200 hover:bg-green-500 p-2 mt-6 text-center"
    >
      {props.children}
    </Link>
  );
};

export { LinkButton };
