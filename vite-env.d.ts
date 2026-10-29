/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NOTIFY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
