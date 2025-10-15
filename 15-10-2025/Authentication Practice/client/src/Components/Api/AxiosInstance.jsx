import axios from "axios";

// cant define base_url directly here because their are 2 different backend with seperate ports
const BASE_AUTH_URL = import.meta.env.VITE_AUTH_BASE_URL;
const BASE_RESOURCE_URL = import.meta.env.VITE_RESOURCE_BASE_URL;
console.log(BASE_RESOURCE_URL);

const axiosAuthInstance = axios.create({
  baseURL: BASE_AUTH_URL,
  withCredentials: true,
});

const axiosResInstance = axios.create({
  baseURL: BASE_RESOURCE_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

export { axiosAuthInstance, axiosResInstance };
