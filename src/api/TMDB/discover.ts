import httpClient from "./httpClient";
import type { DiscoverQueryParams, Movie, ResponseList } from "./types";

const path = "/discover";

const defaultQueryParams: DiscoverQueryParams = {
  include_adult: false,
  include_video: false,
};

const discover = {
  /**
   * Search movies sorted by popularity.
   */
  async searchMovies(
    params: DiscoverQueryParams = defaultQueryParams,
  ): Promise<ResponseList<Movie>> {
    const p = {
      ...params,
      ...defaultQueryParams,
    };
    const { data } = await httpClient.get(`${path}/movie`, { params: p });
    return data;
  },
};

export default discover;
