import { Link, useLoaderData } from "react-router-dom";
import { useEffect, type CSSProperties } from "react";
import type { MovieLoaderData } from "./loader";
import AppBar from "@app/components/AppBar";
import Image from "@app/components/Image";
import dateFormatter from "@app/utils/date";
import { fromMinutesToHours } from "@app/utils/time";
import { imgBaseURL } from "@app/api/TMDB";
import Card from "@app/components/Card";

export default function MoviePage() {
  const { movie, crew, cast, videos, recommendations } =
    useLoaderData() as MovieLoaderData;

  const releaseDate = dateFormatter(movie.release_date);
  const genres = movie.genres.map(({ name }) => name).join(", ");
  const runtime = fromMinutesToHours(movie.runtime);
  const details = [releaseDate, genres, runtime].join(" • ");
  const voteAverage = Math.trunc(movie.vote_average);
  const crewPeople = crew.splice(0, 8);
  const youtubeVideosKeys = videos.filter(
    ({ name, site }) =>
      name.toLowerCase().includes("trailer") &&
      site.toLowerCase().includes("youtube"),
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <AppBar className="min-h-[600px] text-white">
        <div className="grid grid-cols-12 gap-8">
          <div className="relative col-span-4">
            <div className="absolute overflow-hidden rounded shadow">
              <Image src={movie.poster_url} alt={movie.title} />
            </div>
          </div>

          <div className="col-span-8 flex flex-col">
            <div className="mb-4 flex flex-col gap-2">
              <p className="text-3xl/9 font-bold">{movie.title}</p>
              <p className="text-lg">{details}</p>
            </div>

            <div className="mb-8 flex items-center gap-3">
              <div className="relative flex h-[60px] w-[60px] gap-2 rounded-full bg-white/10 text-[#14FF00]">
                <p className="m-auto font-bold">{voteAverage}</p>
                <div className="circle-progress absolute">
                  <svg className="relative h-[60px] w-[60px] -rotate-90">
                    <circle
                      style={{ "--percent": voteAverage } as CSSProperties}
                      className="h-full w-full fill-none stroke-[#14FF00] stroke-[4px]"
                      cx="30"
                      cy="30"
                      r="28"
                    ></circle>
                  </svg>
                </div>
              </div>
              <p>Avaliação dos usuários</p>
            </div>

            <div className="mb-7 flex flex-col gap-2">
              <p className="text-xl font-bold">Sinopse</p>
              <p className="text-base text-[#ddd]">
                {movie.overview ? movie.overview : "Sem sipnopse."}
              </p>
            </div>

            <div className="grid grid-flow-col grid-cols-4 grid-rows-2 gap-7">
              {crewPeople.map((crewPerson) => (
                <div key={crypto.randomUUID()}>
                  <p className="font-bold">{crewPerson.name}</p>
                  <p className="text-sm">{crewPerson.known_for_department}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppBar>

      <section
        id="cast"
        className="sm:page-mx md:page-mx lg:page-mx xl:page-mx 2xl:page-mx"
      >
        <p className="mb-7 mt-28 text-3xl font-bold">Elenco original</p>
        <div className="flex w-full flex-nowrap gap-4 overflow-auto px-2 py-4">
          {cast.map(({ id, character, name, profile_path }) => (
            <div
              key={id}
              className="flex min-w-[191px] max-w-[191px] flex-col gap-4 p-2 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
            >
              <Image
                src={profile_path ? `${imgBaseURL}${profile_path}` : null}
                alt={name}
              />
              <p className="text-lg font-bold">{name}</p>
              <p className="text-base">{character}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="trailer"
        className="sm:page-mx md:page-mx lg:page-mx xl:page-mx 2xl:page-mx"
      >
        <p className="mt-10 text-3xl font-bold">Trailer</p>
        <div className="flex w-full flex-nowrap gap-4 overflow-auto px-2 py-4">
          {youtubeVideosKeys.length ? (
            youtubeVideosKeys.map(({ id, key }) => (
              <iframe
                key={id}
                className="min-w-[907px] max-w-[907px]"
                width="907"
                height="510"
                src={`https://www.youtube.com/embed/${key}`}
              ></iframe>
            ))
          ) : (
            <p>Nenhum trailer encontrado.</p>
          )}
        </div>
      </section>

      <section
        id="recommendations"
        className="sm:page-mx md:page-mx lg:page-mx xl:page-mx 2xl:page-mx"
      >
        <div className="pb-10">
          <p className="mt-10 text-3xl font-bold">Recomendações</p>
          <div className="flex w-full flex-nowrap gap-4 overflow-auto px-2 py-4">
            {recommendations.length ? (
              recommendations.map((movie) => (
                <Link
                  key={movie.id}
                  className="min-w-[176px] max-w-[176px]"
                  to={`../movie/${movie.id}`}
                  reloadDocument
                >
                  <Card
                    imgSrc={movie.poster_url}
                    imgAlt={movie.title}
                    title={movie.title}
                    description={dateFormatter(movie.release_date, {
                      month: "short",
                      separator: " ",
                    })}
                  />
                </Link>
              ))
            ) : (
              <p>Sem recomendações.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
