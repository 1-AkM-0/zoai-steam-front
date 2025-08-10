import axios from "axios";

const api = axios.create({
  baseURL: "https://zoai-steam.onrender.com/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let accessToken = null;

api.interceptors.request.use(async (config) => {
  accessToken = getToken();
  console.log(accessToken);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !error.config.url.endsWith("/refresh") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await authServices.refresh();

        setToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (error) {
        authServices.logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

const setToken = (token) => {
  localStorage.setItem("accessToken", token);
  api.defaults.headers.commom.Authorization = `Bearer ${token}`;
};

const getToken = () => {
  return localStorage.getItem("accessToken");
};

export default api;
export { setToken };
