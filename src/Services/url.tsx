import axios from "axios";

const baseURL = "https://upskilling-egypt.com:3003/api/v1";

export const axiosInstance = axios.create({
    baseURL , 
    headers : {Authorization:localStorage.getItem('token')}
});

// ****************** USERS Auth **********************
export const USERS_URLS ={
    LOGIN :`/Users/Login`,
}