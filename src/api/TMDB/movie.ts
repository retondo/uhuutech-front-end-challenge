import httpClient from "./httpClient";
import type { Movie, QueryParams, ResponseList } from "./types";

const path = "/movie";

const movie = {
  async getPopular(params?: QueryParams): Promise<ResponseList<Movie>> {
    const { data } = await httpClient.get(`${path}/popular`, { params });
    return data;
  },
  async getMovie(id: number): Promise<Movie> {
    const { data } = await httpClient.get(`${path}/${id}`);
    return data;
  },
};

export default movie;
