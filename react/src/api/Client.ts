import axios from "axios";

const createClient = axios.create({
  baseURL: "http://localhost"
});

export default createClient;
