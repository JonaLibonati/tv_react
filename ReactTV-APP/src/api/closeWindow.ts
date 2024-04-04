import axios from "./axios";

export const closeWindow = () => {
  return axios.get("/tv/shutdown/window");
};
