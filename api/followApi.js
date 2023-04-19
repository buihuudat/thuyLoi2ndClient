import axiosClient from "./axiosClient";

export const followApi = {
  followers: (payload) => axiosClient.get(`/follow/followers/${payload._id}`),
  following: (payload) => axiosClient.get(`/follow/following/${payload._id}`),
  follow: (payload) => axiosClient.post(`/follow/${payload._id}`, payload),
  unfollow: (payload) =>
    axiosClient.delete(`/follow/unfollow/${payload._id}/${payload.follower}`),
};
