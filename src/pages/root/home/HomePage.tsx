import { Link, useLoaderData } from "react-router-dom";
import { useRef } from "react";
import type { HomePageLoaderData } from "./loader";
import AppBar from "@app/components/AppBar";
import ToggleButton from "@app/components/ToggleButton";
import useFilters from "@app/hooks/useFilters";
import ToggleFilter from "@app/components/ToggleFilter";
import Card from "@app/components/Card";
import List from "@app/components/List";
import Paginator from "@app/components/Paginator";
import dateFormatter from "@app/utils/date";

export default function HomePage() {
  const { movies, genres, pagination } = useLoaderData() as HomePageLoaderData;
  const { filters, setFilters, removeFilters } = useFilters();
  const listRef = useRef<HTMLElement>(null);

  function handleLoadPage() {
    window.scrollTo({ behavior: "smooth", top: listRef.current?.offsetTop });
  }

  return (
    <>
      <AppBar className="xl:px-52">
        <p className="mr-16 text-2xl font-bold text-white sm:mr-72 md:mr-0 md:text-center md:text-5xl">
          Milhões de filmes, séries e pessoas para descobrir. Explore já.
        </p>
        <ToggleFilter title="Filtre por:">
          {genres.map((genre) => (
            <ToggleButton
              key={crypto.randomUUID()}
              label={genre.name}
              toggle={filters.genre.includes(genre.id)}
              onClick={() =>
                setFilters([
                  { key: "genre", value: genre.id, append: true },
                  { key: "page", value: 1 },
                ])
              }
              onClear={() =>
                removeFilters([
                  { key: "genre", value: genre.id },
                  { key: "page" },
                ])
              }
            />
          ))}
        </ToggleFilter>
      </AppBar>
      <List
        ref={listRef}
        className="sm:page-mx md:page-mx lg:page-mx xl:page-mx 2xl:page-mx"
        paginator={
          <Paginator
            maxLimit={pagination.total_pages}
            onLoadPage={handleLoadPage}
          />
        }
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="col-span-6 sm:col-span-4 lg:col-span-3 xl:col-span-2"
          >
            <Link to={`movie/${movie.id}`}>
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
          </div>
        ))}
      </List>
    </>
  );
}
