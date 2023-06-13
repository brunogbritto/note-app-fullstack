import { LinkButton } from "./LinkButton";

export type PaginationButtonsProps = {
  pageCount: number;
  getLink: (page: number) => string;
};

export function PaginationButtons({
  pageCount,
  getLink,
}: PaginationButtonsProps) {
  const pageList = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="flex flex-row gap-2 justify-center ">
      <span className="flex mt-[39px] font-semibold">Páginas</span>
      {pageList.map((page) => (
        <div
          key={page}
          className="inline-flex items-center justify-center h-6 w-6 rounded-full mt-7"
        >
          <LinkButton key={page} to={getLink(page)}>
            {String(page)}
          </LinkButton>
        </div>
      ))}
    </div>
  );
}
