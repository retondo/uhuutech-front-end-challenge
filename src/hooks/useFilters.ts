import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import FilterService from "@app/services/FilterService";

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

  const removeFilter = useCallback(
    (key: string, value?: string | number) => {
      setSearchParams((prevSearchParams) => {
        return FilterService.remove(key, value, prevSearchParams);
      });
    },
    [setSearchParams],
  );

  return {
    filters,
    setFilter,
    removeFilter,
  };
}
