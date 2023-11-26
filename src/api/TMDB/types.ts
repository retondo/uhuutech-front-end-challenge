import type { AxiosRequestConfig } from "axios";

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
  poster_path: string;
  poster_url: string | null;
};

export type Genre = {
  id: number;
  name: string;
};

export type DiscoverQueryParams = {
  readonly include_adult?: boolean;
  readonly include_video?: boolean;
  with_genres?: string;
} & QueryParams;

export type RequestConfig = Omit<AxiosRequestConfig, "params">;
