import axios from "axios";
import { baseURL } from "./config";
import { LOGIN } from "../store/actionTypes";

export const loginURL = `${baseURL}/login`;
export const dashboardDataUrl = `${baseURL}/dashboard`;
export const addTopicsURL = `${baseURL}/addTopic`;
export const getTpoicsURL = `${baseURL}/getTopics`;
export const getWordCloudURL = `${baseURL}/getWordCloud`;
export const getMixGraphURL = `${baseURL}/getMixGraphsData`;
export const getDashboardDataURL = `${baseURL}/watchList`;
export const getBugsDataURL = `${baseURL}/bugs`;
export const getRecommendationDataURL = `${baseURL}/recommendations`;

export const LoginRequest = async (data) => {
  try {
    const { data: resData } = await axios.post(loginURL, data);
    return { jwt: resData.jwt, orgDetails: resData.org_details };
  } catch (err) {
    return null;
  }
};

export const fetchDashboardData = async () => {
  try {
    const { data: resData } = await axios.get(dashboardDataUrl);
    return resData;
  } catch (err) {
    return null;
  }
};

export const addKeywordTopics = async (data) => {
  try {
    await axios.post(addTopicsURL, data);
    return true;
  } catch (err) {
    return false;
  }
};

export const getKeywordTopics = async () => {
  try {
    const { data } = await axios.post(getTpoicsURL);
    return data;
  } catch (err) {}
};

export const getWordCloud = async () => {
  try {
    const { data } = await axios.get(getWordCloudURL);

    return data;
  } catch (err) {}
};

export const getMixGraph = async () => {
  try {
    const { data } = await axios.get(getMixGraphURL);
    return data;
  } catch (err) {}
};

export const getBugsData = async () => {
  try {
    const { data } = await axios.post(getBugsDataURL);
    return data;
  } catch (err) {}
};

export const getRecommendationData = async () => {
  try {
    const {
      data: { suggestions: recommendations },
    } = await axios.post(getRecommendationDataURL);
    return recommendations;
  } catch (err) {}
};
