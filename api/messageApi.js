import axiosClient from "./axiosClient";

const messageApi = {
  add: (payload) => axiosClient.post("/message/add", payload),
  get: (payload) => axiosClient.post("message/get", payload),
  delete: (payload) => axiosClient.post("/message/delete", payload),
  listUserChat: (payload) =>
    axiosClient.post("/message/list-user-chat", payload),
  getUserChat: (payload) =>
    axiosClient.get(`/message/get-user-chat/${payload}`),
};

export default messageApi;
