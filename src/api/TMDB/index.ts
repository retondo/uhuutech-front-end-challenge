import httpClient from "./httpClient";
import discover from "./discover";
import genre from "./genre";
import movie from "./movie";

export * from "./types";

const tmdbApiClient = {
  ...discover,
  ...genre,
  ...movie,
  request: httpClient.get,
};

export default tmdbApiClient;
