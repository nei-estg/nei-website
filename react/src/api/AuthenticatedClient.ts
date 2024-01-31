import axios from "axios";
import isLoggedIn from "./utils/LoginStatus";
import { toast, Bounce } from 'react-toastify';

const client = axios.create({
  baseURL: "/",
});

client.interceptors.request.use(
  (config) => {
    if (isLoggedIn()) {
      config.headers.Authorization = `Token ${localStorage.getItem("token")}`;
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
      if (error.response.status === 403) {
        toast("You don't have permission to do this!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      if (error.response.status === 500) {
        toast('Server Returned a Bad Error!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
    return error;
  }
);

export default client;
