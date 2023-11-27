import { useSearchParams } from "react-router-dom";
import FiltersService from "@app/services/FiltersService";
import Button from "./Button";

type PaginatorProps = {
  maxLimit: number;
  onLoadPage?: () => void;
};

type PaginationButtonProps = {
  page: number;
  maxLimit?: number;
  className?: string;
  maxNumberedButtons?: number;
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
  className,
  page,
  maxLimit,
  maxNumberedButtons,
  handler,
}: Required<PaginationButtonProps>) {
  let mapfn: (v: unknown, k: number) => number;
  const length = maxLimit >= maxNumberedButtons ? maxNumberedButtons : maxLimit;

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
        <li key={crypto.randomUUID()} className={className}>
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
}: Required<Omit<PaginationButtonProps, "className" | "maxNumberedButtons">>) {
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

  const { pagination } = FiltersService.parse(searchParams);

  function handler({ page }: { page: number }) {
    if (onLoadPage) {
      onLoadPage();
    }
    setSearchParams(FiltersService.set("page", page));
  }

  return (
    <nav className={`flex items-center justify-center py-4 ${visibilityClass}`}>
      <ul className="flex gap-2">
        <li>
          <FirstPageButton page={pagination.page} handler={handler} />
        </li>
        <li>
          <PreviousPageButton page={pagination.page} handler={handler} />
        </li>
        <NumberedPageButtons
          className="sm:hidden"
          maxNumberedButtons={3}
          page={pagination.page}
          handler={handler}
          maxLimit={maxLimit}
        />
        <NumberedPageButtons
          className="hidden sm:block"
          maxNumberedButtons={5}
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
