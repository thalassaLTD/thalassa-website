import {
  SET_TOTAL_REVIEWS,
  SET_ORG_DETAILS,
  SET_DASHBOARD_DATA,
} from "../actionTypes";

export const setDashboardDataAction = (data) => ({
  type: SET_TOTAL_REVIEWS,
  payload: data,
});

export const setOrgDetails = (data) => ({
  type: SET_ORG_DETAILS,
  payload: data,
});

export const setDashboardData = (data) => ({
  type: SET_DASHBOARD_DATA,
  payload: data,
});
