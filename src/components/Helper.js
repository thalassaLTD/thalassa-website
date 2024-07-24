import axios from 'axios';
import { getAuth } from "firebase/auth";
import AmplitudeEvent from '../components/Amplitude/AmplitudeEvent'
import firebaseErrors from "../firebaseErrors.json";
import 'firebase/auth';


const baseURL = "https://api.joinuplyft.com";


export function getCurrentUser() {
  const currentUser = getAuth().currentUser;
  return currentUser;
}
export function getUserId() {
  const userId = getAuth()?.currentUser?.uid;
  return userId;
}

export function get(endpoint) {
  return axios.get(baseURL + endpoint)
    .then(response => response.data)
    .catch(error => console.error(error));
}

export function post(endpoint, reqData) {
  // reqData = {googleuid: "DQbUdYlk3pfCRsaeFoT2ZCACzKk2"}
  return axios.post(baseURL + endpoint, reqData)
    .then(response => response.data)
    .catch(error => console.error(error));
}
export function post2(endpoint, reqData) {
  return axios.post(baseURL + endpoint, reqData)
    .then(response => response.data)
    .catch(error => console.error(error));
}

export function Amplitude() {
  return AmplitudeEvent();
}

export function getErrorMessage(error) {
  const code = error.code;
  const message = firebaseErrors[code] || "An unknown error occurred.";
  return message;
}
