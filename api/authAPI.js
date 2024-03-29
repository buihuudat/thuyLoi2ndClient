import axiosClient from "./axiosClient";

const authApi = {
  login: (payload) => axiosClient.post("auth/login", payload),
  register: (payload) => axiosClient.post("auth/register", payload),
  verifyToken: () => axiosClient.post("auth/check-auth"),
};

export default authApi;
