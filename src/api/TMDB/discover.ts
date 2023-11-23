import httpClient from "./httpClient";
import type { DiscoverQueryParams, Genre } from "./types";

const path = "/discover";

const defaultQueryParams: DiscoverQueryParams = {
  include_adult: false,
  include_video: false,
};

const discover = {
  async searchMovies(
    params: DiscoverQueryParams = defaultQueryParams,
  ): Promise<{ genres: Genre[] }> {
    const p = {
      ...params,
      ...defaultQueryParams,
    };
    const { data } = await httpClient.get(`${path}/movie`, { params: p });
    return data;
  },
};

export default discover;
