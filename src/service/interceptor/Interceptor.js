import axios from "axios";

//const API_URL = "http://localhost:8080/api"; // your backend base URL
const API_URL = "https://cakemanagement-java-production.up.railway.app/api";
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    
    // Only attach token if not calling forgot-password, login, or register
    if (token && !config.url.includes("/cm/forgot-password") && !config.url.includes("/cm/login") && !config.url.includes("/cm/register")) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
