/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable default-case */
import { SET_ORG_DETAILS } from "../actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_ORG_DETAILS:
      const { payload: data } = action;
      return { ...state, data };
  }
  return state;
};
