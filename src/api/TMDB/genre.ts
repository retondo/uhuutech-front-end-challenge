import httpClient from "./httpClient";
import type { Genre, QueryParams } from "./types";

const path = "/genre";

const genre = {
  async getMoviesGenres(
    params?: Pick<QueryParams, "language">,
  ): Promise<{ genres: Genre[] }> {
    const { data } = await httpClient.get(`${path}/movie/list`, { params });
    return data;
  },
};

export default genre;
