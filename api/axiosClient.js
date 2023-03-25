import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IP = "192.168.1.9";
// const IP = "192.168.0.186";
const baseURL = `http://${IP}:9000/api/`;
const getToken = () => AsyncStorage.getItem("token");

const axiosClient = axios.create({
  baseURL,
  // paramsSerializer: (params) => queryString.stringify({ params }),
});

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
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
