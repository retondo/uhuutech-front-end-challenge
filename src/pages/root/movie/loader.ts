import type { LoaderFunction } from "react-router-dom";
import tmdbApiClient from "@app/api/TMDB";
import type { Credits, Movie, Video } from "@app/api/TMDB";

type MovieRouteParams = {
  id: string;
};

export type MovieLoaderData = {
  movie: Movie;
  cast: Credits["cast"];
  crew: Credits["crew"];
  videos: Video[];
  recommendations: Movie[];
};

const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<MovieLoaderData> => {
  const { id } = params as MovieRouteParams;

  const results = await Promise.all([
    tmdbApiClient.getMovie(id, {
      signal: request.signal,
    }),
    tmdbApiClient.getMovieCredits(id, {
      signal: request.signal,
    }),
    tmdbApiClient.getMovieVideos(id, {
      signal: request.signal,
    }),
    tmdbApiClient.getMovieRecommendations(id, {
      signal: request.signal,
    }),
  ]);

  const [movie, { cast, crew }, videos, recommendations] = results;

  return {
    movie,
    cast,
    crew,
    videos: videos.results,
    recommendations: recommendations.results,
  };
};

export default loader;
