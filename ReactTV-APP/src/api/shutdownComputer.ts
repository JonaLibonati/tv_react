import axios from "./axios";

export const shutdownComputer = () => {
  return axios.get("/tv/shutdown/computer");
};
