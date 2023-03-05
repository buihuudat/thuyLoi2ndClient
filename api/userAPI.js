import axiosClient from "./axiosClient";

export const userAPI = {
  gets: () => axiosClient.get("/user"),
  get: (payload) => axiosClient.post(`/user/${payload._id}`, payload),
  create: (payload) => axiosClient.post(`/user`, payload),
  update: (payload) => axiosClient.put(`/user/${payload._id}`, payload),
  delete: (payload) => axiosClient.patch(`/user/${payload._id}`, payload),
};
