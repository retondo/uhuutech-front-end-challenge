import httpClient from "./httpClient";
import type { Movie, QueryParams, ResponseList } from "./types";

const path = "/movie";
const imgBaseURL = "https://image.tmdb.org/t/p/original";

function dateFormatter(date: string): string {
  const d = new Date(date);

  const day = d.toLocaleString("default", { day: "2-digit" });
  const month = d.toLocaleString("default", { month: "short" });
  const year = d.toLocaleString("default", { year: "numeric" });

  return `${day} ${month} ${year}`;
}

export function mapper(movies: Movie[]): Movie[] {
  return movies.map((movie) => ({
    ...movie,
    poster_url: movie.poster_path ? `${imgBaseURL}${movie.poster_path}` : null,
    release_date: dateFormatter(movie.release_date),
  }));
}

async function getPopular(params?: QueryParams): Promise<ResponseList<Movie>> {
  const { data } = await httpClient.get<ResponseList<Movie>>(
    `${path}/popular`,
    { params },
  );

  return {
    ...data,
    results: mapper(data.results),
  };
}

async function getMovie(id: number): Promise<Movie> {
  const { data } = await httpClient.get(`${path}/${id}`);
  return data;
}

const movie = {
  getPopular,
  getMovie,
};

export default movie;
