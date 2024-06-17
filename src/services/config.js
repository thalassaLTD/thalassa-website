import axios from "axios";

export function setAuthToken(token) {
  axios.defaults.headers.common["Authorization"] = "";
  delete axios.defaults.headers.common["Authorization"];
  if (token) {
    axios.defaults.headers.common["Authorization"] = `${token}`;
  }
}

// export const baseURL = "https://api.thalassa.com";
export const baseURL2 = "http://ec2-54-159-227-209.compute-1.amazonaws.com";
export const baseURL = "http://0.0.0.0:8000";
