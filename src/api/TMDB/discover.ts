import httpClient from "./httpClient";
import { mapper } from "./movie";
import type { DiscoverQueryParams, Movie, ResponseList } from "./types";

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
): Promise<ResponseList<Movie>> {
  const p = {
    ...params,
    ...defaultQueryParams,
  };
  const { data } = await httpClient.get(`${path}/movie`, { params: p });

  return {
    ...data,
    results: mapper(data.results),
  };
}

const discover = {
  searchMovies,
};

export default discover;
