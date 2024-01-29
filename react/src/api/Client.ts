import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost"
});

export default client;