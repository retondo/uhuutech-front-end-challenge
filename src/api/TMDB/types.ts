export type QueryParams = {
  language?: string;
  page?: number;
};

export type Pagination = {
  page: number;
  total_pages: number;
  total_results: number;
};

export type ResponseList<T> = {
  results: T[];
} & Pagination;

export type Movie = {
  id: number;
  title: string;
  release_date: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type DiscoverQueryParams = {
  readonly include_adult: boolean;
  readonly include_video: boolean;
  with_genres?: number[];
} & QueryParams;
