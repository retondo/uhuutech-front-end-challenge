import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import FilterService from "@app/services/FilterService";

type FilterArgs = {
  key: string;
  value?: string | number;
};

type SetFilterArgs = ({
  append?: boolean;
} & Required<FilterArgs>)[];

type RemoveFiltersArgs = FilterArgs[];

export default function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => FilterService.parse(searchParams),
    [searchParams],
  );

  const setFilter = useCallback(
    (key: string, value: string | number, append: boolean = false) => {
      setSearchParams((prevSearchParams) => {
        return FilterService.set(key, value, append, prevSearchParams);
      });
    },
    [setSearchParams],
  );

  const setFilters = useCallback(
    (filters: SetFilterArgs) => {
      setSearchParams((prevSearchParams) => {
        return filters.reduce(
          (acc, { key, value, append = false }) =>
            FilterService.set(key, value, append, acc),
          prevSearchParams,
        );
      });
    },
    [setSearchParams],
  );

  const removeFilter = useCallback(
    (key: string, value?: string | number) => {
      setSearchParams((prevSearchParams) => {
        return FilterService.remove(key, value, prevSearchParams);
      });
    },
    [setSearchParams],
  );

  const removeFilters = useCallback(
    (filters: RemoveFiltersArgs) => {
      setSearchParams((prevSearchParams) => {
        return filters.reduce(
          (acc, { key, value }) => FilterService.remove(key, value, acc),
          prevSearchParams,
        );
      });
    },
    [setSearchParams],
  );

  return {
    filters,
    setFilter,
    setFilters,
    removeFilter,
    removeFilters,
  };
}
