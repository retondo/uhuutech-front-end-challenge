import type { RouteObject } from "react-router-dom";
import RootPage from "./RootPage";
import homeRoute from "./home";

const rootRoute: RouteObject = {
  path: "/",
  element: <RootPage />,
  children: [homeRoute],
};

export default rootRoute;
