import axios from "axios";

const createClient = axios.create({
  baseURL: "/"
});

export default createClient;
