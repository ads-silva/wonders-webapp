import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { envConfig } from "../../config/config";

const api = axios.create({
  baseURL: envConfig.BACKEND_URL,
});

api.interceptors.request.use(async (config) => {
  const token = Cookies.get("wonders_token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      Cookies.remove("wonders_token");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    if (error.response?.status && [404, 400].includes(error.response.status)) {
      throw error;
    }
  }
);

export default api;
