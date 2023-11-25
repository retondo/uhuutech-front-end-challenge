import { useSearchParams } from "react-router-dom";
import FilterService from "@app/services/FilterService";
import Button from "./Button";

type PaginatorProps = {
  maxLimit: number;
  onLoadPage?: () => void;
};

type PaginationButtonProps = {
  page: number;
  maxLimit?: number;
  handler: ({ page }: { page: number }) => void;
};

function FirstPageButton({ page, handler }: PaginationButtonProps) {
  let visibility = "visible";

  if (page < 3) {
    visibility = "invisible";
  }

  return (
    <Button className={visibility} onClick={() => handler({ page: 1 })}>
      Primeira
    </Button>
  );
}

function PreviousPageButton({ page, handler }: PaginationButtonProps) {
  let visibility = "visible";

  if (page === 1) {
    visibility = "invisible";
  }
  const previousPage = page - 1;

  return (
    <Button
      className={visibility}
      onClick={() => handler({ page: previousPage })}
    >
      {"<"}
    </Button>
  );
}

function NumberedPageButtons({
  page,
  maxLimit,
  handler,
}: Required<PaginationButtonProps>) {
  let mapfn: (v: unknown, k: number) => number;
  const length = maxLimit >= 5 ? 5 : maxLimit;

  if (maxLimit <= 5 || page < 3) {
    mapfn = (_, i) => i + 1;
  } else if (page > maxLimit - 5) {
    mapfn = (_, i) => maxLimit + (i - 4);
  } else {
    mapfn = (_, i) => page + (i - 2);
  }

  const numberedPages = Array.from({ length }, mapfn);

  return (
    <>
      {numberedPages.map((n) => (
        <li key={`pg-${n}`}>
          <Button
            className={`${page === n && "bg-[#d18000] text-white"}`}
            onClick={() => handler({ page: n })}
          >
            {n}
          </Button>
        </li>
      ))}
    </>
  );
}

function NextPageButton({ page, maxLimit, handler }: PaginationButtonProps) {
  let visibility = "visible";

  if (page === maxLimit) {
    visibility = "invisible";
  }
  const nextPage = page + 1;

  return (
    <Button className={visibility} onClick={() => handler({ page: nextPage })}>
      {">"}
    </Button>
  );
}

function LastPageButton({
  page,
  maxLimit,
  handler,
}: Required<PaginationButtonProps>) {
  let visibility = "visible";

  if (maxLimit < 5 || page === maxLimit || page > maxLimit - 3) {
    visibility = "invisible";
  }

  return (
    <Button
      className={`text-black ${visibility}`}
      onClick={() => handler({ page: maxLimit })}
    >
      Última
    </Button>
  );
}

export default function Paginator({ maxLimit, onLoadPage }: PaginatorProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  let visibilityClass = "visible";

  if (!maxLimit || maxLimit === 1) {
    visibilityClass = "invisible";
  }

  const { pagination } = FilterService.parse(searchParams);

  function handler({ page }: { page: number }) {
    if (onLoadPage) {
      onLoadPage();
    }
    setSearchParams(FilterService.set("page", page));
  }

  return (
    <nav className={`flex place-content-center py-4 ${visibilityClass}`}>
      <ul className="flex gap-2">
        <li>
          <FirstPageButton page={pagination.page} handler={handler} />
        </li>
        <li>
          <PreviousPageButton page={pagination.page} handler={handler} />
        </li>
        <NumberedPageButtons
          page={pagination.page}
          handler={handler}
          maxLimit={maxLimit}
        />
        <li>
          <NextPageButton
            page={pagination.page}
            handler={handler}
            maxLimit={maxLimit}
          />
        </li>
        <li>
          <LastPageButton
            page={pagination.page}
            handler={handler}
            maxLimit={maxLimit}
          />
        </li>
      </ul>
    </nav>
  );
}
