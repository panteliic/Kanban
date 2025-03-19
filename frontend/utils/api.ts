import axios from "axios";
import { store } from "../store";
import { logout, setAccessToken } from "../redux/authSlice"; 

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken; 

  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("Token is expired, trying to refresh...");
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
          withCredentials: true, 
        });
        store.dispatch(setAccessToken(data.accessToken)); 
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest); 
      } catch (refreshError) {
        console.log("Refresh failed, logging out...");
        store.dispatch(logout()); 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
