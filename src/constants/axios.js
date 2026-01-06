import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.freeapi.app/api/v1",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

instance.interceptors.response.use((response) => {
  // console.log({ response: response.data });
  return response;
});

export default instance;

//OOPs
