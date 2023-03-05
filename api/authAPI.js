import axiosClient from "./axiosClient";

export const authAPI = {
  login: (payload) => axiosClient.post("/auth/login", payload),
  register: (payload) => axiosClient.post("/auth/register", payload),
  checkAuth: () => axiosClient.post("/auth/check-auth"),
};
