import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const IP = "192.168.1.14";
// const IP = "192.168.1.9";
// const IP = "192.168.0.108";
// const IP = "192.168.22.145";
const baseURL = `http://${IP}:5000/api`;
// const baseURL = "http://localhost:5000/api";
const getToken = () => AsyncStorage.getItem("token");

const axiosClient = axios.create({
  baseURL,
});

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Barer ${getToken()}`,
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
