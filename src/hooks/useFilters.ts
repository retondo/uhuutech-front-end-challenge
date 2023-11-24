import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

type Filters = {
  genre: number[];
};

function parser(searchParams: URLSearchParams): Filters {
  const searchParamsObj = Object.fromEntries(searchParams.entries());
  return {
    genre: searchParamsObj.genre?.split(",").map((id) => Number(id)) ?? [],
  };
}

export default function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => parser(searchParams), [searchParams]);

  const setFilter = useCallback(
    (key: string, value: string | number, append: boolean = false) => {
      const hasFilter = searchParams.has(key);

      if (hasFilter && append) {
        return setSearchParams((prevSearchParams) => {
          const filter = prevSearchParams.get(key)!.split(",");
          filter.push(String(value));
          prevSearchParams.set(key, filter.join(","));
          return prevSearchParams;
        });
      }

      setSearchParams((prevSearchParams) => {
        prevSearchParams.set(key, String(value));
        return prevSearchParams;
      });
    },
    [searchParams, setSearchParams],
  );

  const removeFilter = useCallback(
    (key: string, value?: string | number) => {
      const hasFilter = searchParams.has(key);

      if (hasFilter) {
        if (value) {
          return setSearchParams((prevSearchParams) => {
            const filter = searchParams.get(key)!.split(",");
            const index = filter.findIndex((v) => v == value);
            filter.splice(index, 1);
            prevSearchParams.set(key, filter.join(","));
            return prevSearchParams;
          });
        }

        setSearchParams((prevSearchParams) => {
          prevSearchParams.delete(key);
          return prevSearchParams;
        });
      }
    },
    [searchParams, setSearchParams],
  );

  return {
    filters,
    setFilter,
    removeFilter,
  };
}
