import axios from "./axios";

export const getChannels = () => {
  return axios.get("/tv/channels");
};
