import httpClient from "./httpClient";
import movie from "./movie";

export * from "./types";

const tmdbApiClient = {
  request: httpClient.get,
  ...movie,
};

export default tmdbApiClient;
