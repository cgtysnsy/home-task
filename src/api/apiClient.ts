import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://iapitest.eva.guru/",
  headers: {
    "Content-Type": "application/json",
  },
});
console.log(localStorage.getItem("accessToken"));
apiClient.interceptors.request.use(
  (config) => {
    // Retrieve the token from storage (localStorage, Vuex, etc.)
    const token = localStorage.getItem("accessToken"); // Adjust based on your token storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors, e.g., redirect to login if the token is invalid or expired
    if (error.response && error.response.status === 401) {
      // Handle 401 errors specifically if needed
    }
    return Promise.reject(error);
  }
);

export default apiClient;
