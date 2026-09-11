import axios from "axios";

const api = axios.create({
  baseURL: "http://www.omdbapi.com",
  headers: {
    // "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  console.log(`[API Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`[API Error] ${error.response?.status ?? "Network Error"} ${error.config?.url}`);
    return Promise.reject(error);
  }
);

export default api;
