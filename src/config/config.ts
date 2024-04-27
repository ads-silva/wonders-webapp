interface EnvConfig {
  BACKEND_URL?: string;
}

export const envConfig: EnvConfig = {
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
};
