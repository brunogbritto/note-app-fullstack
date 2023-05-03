import { Link } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";

export type BreadcrumbsProps = {
  links: { title: string; link: string }[];
};

const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
  return (
    <nav className="flex flex-row items-center">
      {links.map(({ title, link }, index) => (
        <span className="flex flex-row items-center" key={index}>
          <Link
            key={index}
            to={link}
            className="text-blue-500 hover:text-blue-700 text-md mb-[1px]"
          >
            {title}
          </Link>
          {index !== links.length - 1 && <MdOutlineNavigateNext size="20px" />}
        </span>
      ))}
    </nav>
  );
};

export { Breadcrumbs };
