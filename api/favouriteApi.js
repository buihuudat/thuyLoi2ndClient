import axiosClient from "./axiosClient";

const favouriteApi = {
  gets: (payload) => axiosClient.get(`favourite/${payload.user_id}`),
  get: (payload) =>
    axiosClient.post(`favourite/${payload.user_id}/${payload.post_id}`),
  update: (payload) =>
    axiosClient.put(`favourite/${payload.user_id}/${payload.post_id}`),
};

export default favouriteApi;
