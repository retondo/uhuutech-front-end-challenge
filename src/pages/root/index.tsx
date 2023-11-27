import type { RouteObject } from "react-router-dom";
import RootPage from "./RootPage";
import homeRoute from "./home";
import movieRoute from "./movie";

const rootRoute: RouteObject = {
  path: "/",
  element: <RootPage />,
  children: [homeRoute, movieRoute],
};

export default rootRoute;
