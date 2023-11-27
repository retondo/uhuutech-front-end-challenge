import type { RouteObject } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import RootPage from "./RootPage";
import homeRoute from "./home";
import movieRoute from "./movie";

const rootRoute: RouteObject = {
  path: "/",
  element: <RootPage />,
  errorElement: <ErrorBoundary />,
  children: [homeRoute, movieRoute],
};

export default rootRoute;
