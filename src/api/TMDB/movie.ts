import httpClient from "./httpClient";
import type {
  CastPerson,
  Credits,
  Movie,
  QueryParams,
  RequestConfig,
  ResponseList,
  Video,
} from "./types";

const path = "/movie";
export const imgBaseURL = "https://image.tmdb.org/t/p/original";

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

async function getMovieCredits(
  id: string,
  config: RequestConfig = {},
): Promise<Credits> {
  const { data } = await httpClient.get(`${path}/${id}/credits`, config);
  const cast = (data.cast as CastPerson[]).map((castPerson) => ({
    ...castPerson,
    profile_url: castPerson.profile_path
      ? `${imgBaseURL}${castPerson.profile_path}`
      : null,
  }));

  return {
    ...data,
    cast,
  };
}

async function getMovieVideos(
  id: string,
  config: RequestConfig = {},
): Promise<ResponseList<Video>> {
  const { data } = await httpClient.get(`${path}/${id}/videos`, config);
  return data;
}

async function getMovieRecommendations(
  id: string,
  config: RequestConfig = {},
): Promise<ResponseList<Movie>> {
  const { data } = await httpClient.get(
    `${path}/${id}/recommendations`,
    config,
  );
  return {
    ...data,
    results: mapper(data.results),
  };
}

const movie = {
  getMovie,
  getMovieCredits,
  getMovieRecommendations,
  getMovieVideos,
  getPopular,
};

export default movie;
