/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_TMDB_V3_BASE_URL: string;
  readonly VITE_TMDB_V3_JWT_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
