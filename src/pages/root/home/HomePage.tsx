import { useLoaderData, useNavigation } from "react-router-dom";
import { useRef } from "react";
import type { HomePageLoaderData } from "./loader";
import AppBar from "@app/components/AppBar";
import ToggleButton from "@app/components/ToggleButton";
import useFilters from "@app/hooks/useFilters";
import ToggleFilter from "@app/components/ToggleFilter";
import Card from "@app/components/Card";
import List from "@app/components/List";
import Paginator from "@app/components/Paginator";

export default function HomePage() {
  const { movies, genres, pagination } = useLoaderData() as HomePageLoaderData;
  const { filters, setFilters, removeFilters } = useFilters();
  const { state } = useNavigation();
  const listRef = useRef<HTMLElement>(null);

  function handleLoadPage() {
    window.scrollTo({ behavior: "smooth", top: listRef.current?.offsetTop });
  }

  return (
    <>
      <AppBar className="sm:content-px md:content-px lg:content-px xl:content-px 2xl:content-px">
        <p className="text-center text-5xl font-bold text-white">
          Milhões de filmes, séries e pessoas para descobrir. Explore já.
        </p>
        <ToggleFilter title="Filtre por:">
          {genres.map((genre) => (
            <ToggleButton
              key={genre.id}
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
        loading={state === "loading"}
        paginator={
          <Paginator
            maxLimit={pagination.total_pages}
            onLoadPage={handleLoadPage}
          />
        }
      >
        {movies.map((movie) => (
          // Link to movie page
          <Card
            key={movie.id}
            imgSrc={movie.poster_url}
            imgAlt={movie.title}
            title={movie.title}
            description={movie.release_date}
          />
        ))}
      </List>
    </>
  );
}
