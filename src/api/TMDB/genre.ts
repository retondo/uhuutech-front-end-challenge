import httpClient from "./httpClient";
import type { Genre, QueryParams } from "./types";

const path = "/genre";

const genre = {
  async getMovieList(
    params?: Pick<QueryParams, "language">,
  ): Promise<{ genres: Genre[] }> {
    const { data } = await httpClient.get(`${path}/movie/list`, { params });
    return data;
  },
};

export default genre;
