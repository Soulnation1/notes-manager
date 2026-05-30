import axios from "axios";
import cookie from "js-cookie";

const api = axios.create({
  baseURL: "https://task-manager-6628.onrender.com",

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = cookie.get("notes-access");
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
      cookie.remove("notes-access");
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  },
);
export default api;
