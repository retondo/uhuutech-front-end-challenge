import httpClient from "./httpClient";
import { mapper } from "./movie";
import type {
  DiscoverQueryParams,
  Movie,
  RequestConfig,
  ResponseList,
} from "./types";

const path = "/discover";

const defaultQueryParams: DiscoverQueryParams = {
  include_adult: false,
  include_video: false,
};

/**
 * Search movies sorted by popularity.
 */
async function searchMovies(
  params: DiscoverQueryParams = defaultQueryParams,
  config: RequestConfig = {},
): Promise<ResponseList<Movie>> {
  const p = {
    ...params,
    ...defaultQueryParams,
  };
  const { data } = await httpClient.get(`${path}/movie`, {
    ...config,
    params: p,
  });

  return {
    ...data,
    results: mapper(data.results),
  };
}

const discover = {
  searchMovies,
};

export default discover;
