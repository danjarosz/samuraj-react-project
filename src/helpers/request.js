import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080",
  validateStatus: false
})

export default request;