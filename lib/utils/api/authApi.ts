import api from "./api";

export const signupUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/api/auth/register", userData);
  return response.data;
};

export const signInUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/api/auth/login", credentials);
  return response.data;
};


