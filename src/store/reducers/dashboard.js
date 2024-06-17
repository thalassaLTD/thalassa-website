/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable default-case */
import { SET_TOTAL_REVIEWS, SET_DASHBOARD_DATA } from "../actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_TOTAL_REVIEWS:
      const { payload: data } = action;
      return { ...state, totalReviews: data };
    case SET_DASHBOARD_DATA:
      const { payload } = action;
      return { ...state, dashboardGraphs: payload };
  }
  return state;
};
