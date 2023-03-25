import axiosClient from "./axiosClient";

const productApi = {
  create: (payload) => axiosClient.post("post", payload),
  update: (payload) => axiosClient.put("post", payload),
  statusUpdate: (payload) => axiosClient.put(`post/${payload._id}`, payload),
  delete: (payload) => axiosClient.delete(`post/${payload}`, payload),
  get: (payload) => axiosClient.post(`post/${payload._id}`, payload),
  userGet: (payload) => axiosClient.post(`post/${payload.user_id}`),
  gets: () => axiosClient.get("post"),
};

export default productApi;
