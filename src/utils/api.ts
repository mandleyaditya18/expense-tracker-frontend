import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: `${apiBaseUrl}/api`,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await axios.post(`${apiBaseUrl}/api/users/token/refresh/`, {
          refresh: refreshToken,
        });
        const { access, refresh } = await response.data;
        localStorage.setItem("token", access);
        localStorage.setItem("refresh_token", refresh);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axios(originalRequest);
      } catch (error) {
        console.error(error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
