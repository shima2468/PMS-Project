import axios from "axios";
const baseURL = "https://upskilling-egypt.com:3003/api/v1";

export const axiosInstance = axios.create({

  baseURL,

});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ****************** USERS Auth **********************

export const USERS_URLS ={
    LOGIN :`/Users/Login`,
    FORGET_PASSWORD :`/Users/Reset/Request`,
    RESET_PASSWORD :`/Users/Reset`,
    REGISTER :`/Users/Register`,
    VERIFY: `/Users/verify`,
    CHANGE_PASSWORD: `/Users/ChangePassword`,
    GET_USER_PROFILE: (id: string) => `/Users/${id}`,

}