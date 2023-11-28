import { Link, useLoaderData } from "react-router-dom";

import AppBar from "@app/components/AppBar";
import Card from "@app/components/Card";
import CastProfile from "@app/components/CastProfile";
import CircleProgress from "@app/components/CircleProgress";
import SectionTitle from "@app/components/SectionTitle";
import YouTubeEmbed from "@app/components/YouTubeEmbed";
import dateFormatter from "@app/utils/date";

import MoviePoster from "./MoviePoster";
import MovieSinopse from "./MovieSinopse";
import MovieTitle from "./MovieTitle";
import type { MovieLoaderData } from "./loader";

export default function MoviePage() {
  const { movie, crew, cast, videos, recommendations } =
    useLoaderData() as MovieLoaderData;

  return (
    <>
      <AppBar className="min-h-[600px] text-white xl:bg-gradient-to-b xl:from-secondary xl:from-85% xl:to-white xl:to-15%">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-start-4 col-end-10 lg:col-span-4">
            <MoviePoster src={movie.poster_url} alt={movie.title} />
          </div>

          <div className="col-span-full flex flex-col lg:col-span-8">
            <div className="mb-4 mt-4 lg:mt-0">
              <MovieTitle
                title={movie.title}
                description={[
                  dateFormatter(movie.release_date),
                  movie.genres,
                  movie.runtime,
                ]}
              />
            </div>

            <div className="mb-8">
              <CircleProgress
                value={movie.vote_average}
                label="Avaliação dos usuários"
              />
            </div>

            <div className="mb-7">
              <MovieSinopse sinopse={movie.overview} fallback="Sem sinopse." />
            </div>

            <div className="grid grid-flow-col grid-cols-3 grid-rows-2 gap-7">
              {crew.map((crewPerson) => (
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
        <div className="mb-7 mt-10 xl:mt-0">
          <SectionTitle title="Elenco original" />
        </div>
        <div className="flex w-full flex-nowrap gap-4 overflow-auto px-2 py-4">
          {cast.map(({ character, name, profile_url }) => (
            <CastProfile
              key={crypto.randomUUID()}
              imgSrc={profile_url}
              name={name}
              description={character}
            />
          ))}
        </div>
      </section>

      <section
        id="trailers"
        className="sm:page-mx md:page-mx lg:page-mx xl:page-mx 2xl:page-mx"
      >
        <div className="mt-10">
          <SectionTitle title="Trailers" />
        </div>
        <div className="flex w-full flex-nowrap gap-4 overflow-auto px-2 py-4">
          {videos.length ? (
            videos.map(({ key }) => (
              <YouTubeEmbed key={crypto.randomUUID()} srcKey={key} />
            ))
          ) : (
            <p className="text-base text-gray-400">
              Nenhum trailer encontrado.
            </p>
          )}
        </div>
      </section>

      <section
        id="recommendations"
        className="sm:page-mx md:page-mx lg:page-mx xl:page-mx 2xl:page-mx"
      >
        <div className="pb-10">
          <div className="mt-10">
            <SectionTitle title="Recomendações" />
          </div>
          <div className="flex w-full flex-nowrap gap-4 overflow-auto px-2 py-4">
            {recommendations.length ? (
              recommendations.map((movie) => (
                <Link
                  key={movie.id}
                  className="min-w-[176px] max-w-[176px]"
                  to={`../${movie.id}`}
                  relative="path"
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
