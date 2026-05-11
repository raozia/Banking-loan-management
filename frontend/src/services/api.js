import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Add a request interceptor

api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log(config);
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (errors) {
    // Do something with request error
    return Promise.reject(errors);
  },
);
// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("Refresh Token:", Cookies.get("refreshToken"));

    return response;
  },

  async (errors) => {
    if (errors.response?.status === 401) {
      try {
        const refreshToken = Cookies.get("refreshToken");
        const res = await axios.post("http://localhost:3000/auth/refresh", {
          refresh_token: refreshToken,
          expiresInMins: 10,
        });
        Cookies.set("accessToken", res.data.data.accessToken);
        // console.log("accessToken is....", res.data.accessToken);
        errors.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(errors.config);
      } catch {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/";
      }
    }
    return Promise.reject(errors);
  },
);
export default api;
