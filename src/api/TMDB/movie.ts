import httpClient from "./httpClient";
import type {
  Credits,
  Movie,
  QueryParams,
  RequestConfig,
  ResponseList,
} from "./types";

const path = "/movie";
const imgBaseURL = "https://image.tmdb.org/t/p/original";

export function mapper(movies: Movie[]): Movie[] {
  return movies.map((movie) => ({
    ...movie,
    poster_url: movie.poster_path ? `${imgBaseURL}${movie.poster_path}` : null,
    vote_average: movie.vote_average * 10,
  }));
}

async function getPopular(
  params?: QueryParams,
  config: RequestConfig = {},
): Promise<ResponseList<Movie>> {
  const { data } = await httpClient.get<ResponseList<Movie>>(
    `${path}/popular`,
    { ...config, params },
  );

  return {
    ...data,
    results: mapper(data.results),
  };
}

async function getMovie(
  id: string,
  config: RequestConfig = {},
): Promise<Movie> {
  const { data } = await httpClient.get(`${path}/${id}`, config);
  const [movie] = mapper([data]);
  return movie;
}

async function getCredits(
  id: string,
  config: RequestConfig = {},
): Promise<Credits> {
  const { data } = await httpClient.get(`${path}/${id}/credits`, config);
  return data;
}

const movie = {
  getCredits,
  getPopular,
  getMovie,
};

export default movie;
