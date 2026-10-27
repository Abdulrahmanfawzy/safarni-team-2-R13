import axios from "axios";
import { getAccessToken } from "./getAccessToken";

export const apiClient = axios.create({
  baseURL: process.env.API,
  headers: {
    "Content-Type": "application/json",
  },
});

// add token on headers before send request (if user is has token)
apiClient.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }
  return config;
});
