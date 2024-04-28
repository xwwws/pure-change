import axios,{type AxiosRequestConfig } from "axios";
import { storageLocal } from "@pureadmin/utils";
import { message } from "@/utils/message";

const { VITE_BASE_URL } = import.meta.env;
const service = axios.create({
  baseURL: VITE_BASE_URL
});


service.interceptors.request.use(config => {
  // 统一添加请求头，如果有token就添加请求头Authorization
  const token = storageLocal().getItem('token');
  // 判断token是否存在
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, err => {
  return Promise.reject(err);
});

service.interceptors.response.use(response => {
  return response.data;
}, error => {
  console.log(error);
  message('请求出错了',{
    type: "error"
  })
  return Promise.reject(error);
});



export default service

