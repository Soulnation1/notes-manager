import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-6628.onrender.com",

  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
api.interceptors.response.use(
  (response) => response,

  (error) => {
    console.log("error from axios", error);
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      window.location.href = "/signin";
    }

    return Promise.reject(error);
  },
);
export default api;
