import type { RouteObject } from "react-router-dom";
import HomePage from "./HomePage";
import loader from "./loader";

const homeRoute: RouteObject = {
  index: true,
  element: <HomePage />,
  loader,
};

export default homeRoute;
