import type { RouteObject } from "react-router-dom";
import MoviePage from "./MoviePage";
import loader from "./loader";

const movieRoute: RouteObject = {
  path: "/movie/:id",
  element: <MoviePage />,
  loader,
};

export default movieRoute;
