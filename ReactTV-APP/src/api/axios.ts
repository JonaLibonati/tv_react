import axios from "axios";

// const protocol = window.location.protocol + "//";
// const hostname = window.location.hostname;
// const port = window.location.port;
const version = "/api/v1";

export default axios.create({
  baseURL: "http://127.0.0.1:3000" + version,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
