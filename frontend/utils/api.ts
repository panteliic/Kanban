import axios from "axios";
import { store } from "../store";
import { setAccessToken } from "../store/authSlice";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const refreshResponse = await axios.post("/api/refresh", {}, { withCredentials: true });

      if (refreshResponse.status === 200) {
        store.dispatch(setAccessToken(refreshResponse.data.accessToken));
        error.config.headers["Authorization"] = `Bearer ${refreshResponse.data.accessToken}`;
        return api(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
