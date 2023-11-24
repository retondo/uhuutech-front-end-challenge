type Filters = {
  genre: number[];
  pagination: {
    page: number;
  };
};

export default class FilterService {
  static parse(params?: URLSearchParams): Filters {
    const searchParams =
      params ?? new URLSearchParams(document.location.search);

    const searchParamsObj = Object.fromEntries(searchParams.entries());

    // TODO: sanitize and validate params
    return {
      genre: searchParamsObj.genre?.split(",").map((id) => Number(id)) ?? [],
      pagination: {
        page: searchParamsObj.page ? Number(searchParamsObj.page) : 1,
      },
    };
  }

  static set(
    key: string,
    value: string | number,
    append: boolean = false,
    params?: URLSearchParams,
  ) {
    const searchParams =
      params ?? new URLSearchParams(document.location.search);

    const hasFilter = searchParams.has(key);

    if (hasFilter && append) {
      const filter = searchParams.get(key)!.split(",");
      filter.push(String(value));
      searchParams.set(key, filter.join(","));
      return searchParams;
    } else {
      searchParams.set(key, String(value));
    }

    return searchParams;
  }

  static remove(
    key: string,
    value?: string | number,
    params?: URLSearchParams,
  ): URLSearchParams {
    const searchParams =
      params ?? new URLSearchParams(document.location.search);

    const hasFilter = searchParams.has(key);

    if (hasFilter) {
      const filter = searchParams.get(key)!.split(",");

      if (value && filter.length > 1) {
        const index = filter.findIndex((v) => v == value);
        filter.splice(index, 1);
        searchParams.set(key, filter.join(","));
      } else {
        searchParams.delete(key);
      }
    }

    return searchParams;
  }
}
