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
  genres: Genre[];
  runtime: number;
  overview: string;
  vote_average: number;
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

export type Credits = {
  id: number;
  cast: CastPerson[];
  crew: CrewPerson[];
};

export type Person = {
  id: number;
  name: string;
  known_for_department: string;
  profile_path: string | null;
};

export type CastPerson = {
  cast_id: number;
  character: string;
  profile_url: string | null;
} & Person;

export type CrewPerson = {
  department: string;
} & Person;

export type Video = {
  id: string;
  key: string;
  site: string;
  name: string;
};
