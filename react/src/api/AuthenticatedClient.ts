import client from "./Client";

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("expiry"); // 2024-01-30T01:14:30.725785Z
    if (expiry) {
      const now = new Date();
      const expiryDate = new Date(expiry);
      if (now >= expiryDate) {
        localStorage.removeItem("token");
        localStorage.removeItem("expiry");
        window.location.href = "/login";
      }
    }
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    } else {
      window.location.href = "/login";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      }
    }
    return error;
  }
);

export default client;
