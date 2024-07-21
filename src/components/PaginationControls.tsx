import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type Props = {
  currentPage: number;
  onClick: (direction: "prev" | "next") => void;
  numberOfResults: number;
};

export default function PaginationControls({
  currentPage,
  onClick,
  numberOfResults,
}: Props) {
  return (
    <section className="pagination">
      {currentPage > 1 ? (
        <PaginationButton
          direction="prev"
          currentPage={currentPage}
          onClick={() => onClick("prev")}
        />
      ) : (
        <div></div>
      )}
      {currentPage < numberOfResults / 7 - 1 ? (
        <PaginationButton
          direction="next"
          currentPage={currentPage}
          onClick={() => onClick("next")}
        />
      ) : (
        <div></div>
      )}
    </section>
  );
}

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: {
  direction: "prev" | "next";
  currentPage: number;
  onClick: () => void;
}) {
  return (
    <button
      className="pagination__button"
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
    >
      {direction === "prev" && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
