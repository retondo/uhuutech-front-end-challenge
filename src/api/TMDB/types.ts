export type QueryParams = {
  language?: string;
  page?: number;
};

export type ResponseList<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type Movie = {
  id: number;
  title: string;
  release_date: string;
};
