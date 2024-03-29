import axios from "axios";
import { isLoggedIn } from "./utils/LoginStatus";
import { toast, Bounce } from 'react-toastify';
import { RootState } from "@src/components/redux/store";
import { useSelector } from "react-redux";

const client = axios.create({
  baseURL: "/",
});

const darkReader = useSelector((state: RootState) => state.theme.darkMode);

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
      if (error.response.status === 400) {
        //check if the key detail exists in the response
        if (error.response.data.detail) {
          toast.error(error.response.data.detail, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: darkReader ? "dark" : "light",
            transition: Bounce,
          });
        } else if (error.response.data) {
          toast.error(JSON.stringify(error.response.data), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: darkReader ? "dark" : "light",
            transition: Bounce,
          });
        } else {
          toast.error("Bad Request!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: darkReader ? "dark" : "light",
            transition: Bounce,
          });
        }
      } else if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("expiry")
        localStorage.removeItem("profile")
        localStorage.removeItem('courses');
        window.location.href = "/login";
        toast.error("You're not logged in!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkReader ? "dark" : "light",
          transition: Bounce,
        });
      } else if (error.response.status === 403) {
        toast.error("You don't have permission to do this!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkReader ? "dark" : "light",
          transition: Bounce,
        });
      } else if (error.response.status === 429) {
        toast.error("You're sending way too much requests! Wait one hour!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkReader ? "dark" : "light",
          transition: Bounce,
        });
      } else if (error.response.status === 500) {
        toast.error('Server Returned a Bad Error!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkReader ? "dark" : "light",
          transition: Bounce,
        });
      } else if (error.response.status === 502) {
        toast.error('The API is down! Please contact NEI!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkReader ? "dark" : "light",
          transition: Bounce,
        });
      }
    }
    return error;
  }
);

export default client;
