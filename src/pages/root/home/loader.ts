import { LoaderFunction } from "react-router-dom";
import tmdbApiClient from "@app/api/TMDB";
import type { Genre, Movie, Pagination } from "@app/api/TMDB";
import FilterService from "@app/services/FilterService";

export type HomePageLoaderData = {
  movies: Movie[];
  genres: Genre[];
  pagination: Pagination;
};

const loader: LoaderFunction = async ({
  request,
}): Promise<HomePageLoaderData> => {
  const { searchParams } = new URL(request.url);
  const filters = FilterService.parse(searchParams);

  let movies: Movie[];
  let pagination: Pagination;

  if (filters.genre.length > 0) {
    const { results, ...rest } = await tmdbApiClient.searchMovies({
      with_genres: filters.genre.join(","),
      page: filters.pagination.page,
    });
    movies = results;
    pagination = rest;
  } else {
    const { results, ...rest } = await tmdbApiClient.getPopular({
      page: filters.pagination.page,
    });
    movies = results;
    pagination = rest;
  }

  const { genres } = await tmdbApiClient.getMoviesGenres();

  return {
    movies,
    genres,
    pagination,
  };
};

export default loader;
