import httpClient from "./httpClient";
import type { Genre, QueryParams, RequestConfig } from "./types";

const path = "/genre";

const genre = {
  async getMoviesGenres(
    params?: Pick<QueryParams, "language">,
    config: RequestConfig = {},
  ): Promise<{ genres: Genre[] }> {
    const { data } = await httpClient.get(`${path}/movie/list`, {
      ...config,
      params,
    });
    return data;
  },
};

export default genre;
