import axios from "axios";
import type { QueryParams } from "./types";

const baseURL = import.meta.env.VITE_TMDB_V3_BASE_URL;
const jwtToken = import.meta.env.VITE_TMDB_V3_JWT_TOKEN;

const httpClient = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
    Accept: "application/json",
  },
  params: {
    language: navigator.language ?? "pt-BR",
    page: 1,
  } as QueryParams,
});

export default httpClient;
