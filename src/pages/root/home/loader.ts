import { LoaderFunction } from "react-router-dom";
import tmdbApiClient from "@app/api/TMDB";
import type { Genre, Movie, Pagination, ResponseList } from "@app/api/TMDB";
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

  let response: ResponseList<Movie>;

  if (filters.genre.length > 0) {
    response = await tmdbApiClient.searchMovies(
      {
        with_genres: filters.genre.join(","),
        page: filters.pagination.page,
      },
      { signal: request.signal },
    );
  } else {
    response = await tmdbApiClient.getPopular(
      {
        page: filters.pagination.page,
      },
      { signal: request.signal },
    );
  }

  const { genres } = await tmdbApiClient.getMoviesGenres();
  const { results, ...pagination } = response;

  return {
    movies: results,
    genres,
    pagination,
  };
};

export default loader;
