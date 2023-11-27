import type { LoaderFunction } from "react-router-dom";
import type { Credits, Movie, Video } from "@app/api/TMDB";
import tmdbApiClient from "@app/api/TMDB";
import { fromMinutesToHours } from "@app/utils/time";

type MovieRouteParams = {
  id: string;
};

export type MovieLoaderData = {
  movie: { genres: string; runtime: string } & Omit<
    Movie,
    "genres" | "runtime"
  >;
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

  const genres = movie.genres.map(({ name }) => name).join(", ");
  const runtime = fromMinutesToHours(movie.runtime);
  const voteAverage = Math.trunc(movie.vote_average);

  const crewPeople = crew
    .filter((crewPerson) =>
      crewPerson.department.match(
        /directing|characters|screenplay|writing|production/i,
      ),
    )
    .splice(0, 6);

  const youtubeVideosKeys = videos.results.filter(
    ({ name, site }) => name.match(/trailer/i) && site.match(/youtube/i),
  );

  window.scrollTo({ behavior: "smooth", top: 0, left: 0 });

  return {
    movie: {
      ...movie,
      genres,
      runtime,
      vote_average: voteAverage,
    },
    cast,
    crew: crewPeople,
    videos: youtubeVideosKeys,
    recommendations: recommendations.results,
  };
};

export default loader;
