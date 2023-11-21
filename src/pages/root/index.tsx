import type { RouteObject } from "react-router-dom";
import RootPage from "./RootPage";

const rootRoute: RouteObject = {
  path: "/",
  element: <RootPage />,
};

export default rootRoute;
