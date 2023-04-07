import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";

const IP = "192.168.1.10";
// const IP = "192.168.0.46";
// const IP = "192.168.0.186";
const PORT = 9000;
export const host = `http://${IP}:${PORT}`;

const baseURL = `http://${IP}:${PORT}/api/`;
const getToken = async () => await AsyncStorage.getItem("token");

const axiosClient = axios.create({
  baseURL,
  // paramsSerializer: (params) => queryString.stringify({ params }),
});

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken().then((response) => {
        return response;
      })}`,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }
    throw err.response;
  }
);

export default axiosClient;
