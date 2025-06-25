import axios from "axios";
const baseURL = "https://upskilling-egypt.com:3003/api/v1";
export const imgURL = "https://upskilling-egypt.com:3003";

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


export const USERS_URLS = {
  LOGIN: `/Users/Login`,
  FORGET_PASSWORD: `/Users/Reset/Request`,
  RESET_PASSWORD: `/Users/Reset`,
  REGISTER: `/Users/Register`,
  VERIFY: `/Users/verify`,
  CHANGE_PASSWORD: `/Users/ChangePassword`,
  GET_USER_PROFILE: (id: string) => `/Users/${id}`,
  GET_USERS_COUNT: `Users/count`
};
// ****************** PROJECTS **********************
export const PROJECTS_URLS = {
  GET_ALL_PROJECTS_MANGER: `/Project/manger`,
  GET_ALL_PROJECTS_EMPLOYEE: `/Project/employee`,
  GET_ALL_PROJECTS: `/Project`,
  GET_PROJECT_BY_ID: (id: string) => `/Project/${id}`,
  ADD_PROJECT: `/Project`,
  UPDATE_PROJECT: (id: string) => `/Project/${id}`,
  DELETE_PROJECT: (id: string) => `/Project/${id}`,
};

// ****************** USERS LIST **********************
export const USERLIST =
{
  GETALLUSERS : `/Users/`,
  BLOCKED_USER: (id: number) => `/Users/${id}` ,
  Current_USER : `/Users/currentUser` ,
  GET_USER : (id : number) => `/Users/${id}`,
}
// *******************Tasks**************************
export const TASKS_URLS ={
  GET_TASKS_COUNT: `/Task/count`,
  ADD_TASK : `/Task/`,
  UPDATE_TASK : (id:string) => `/Task/${id}`,
}

