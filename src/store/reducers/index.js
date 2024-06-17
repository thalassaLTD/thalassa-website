import { combineReducers } from "redux";
import auth from "./auth";
// import editor from "./reducers/editor";
// import home from "./reducers/home";
// import profile from "./reducers/profile";
// import settings from "./reducers/settings";
import { routerReducer } from "react-router-redux";
import dashboard from "./dashboard";
import orgDetails from "./org.js";

export default combineReducers({
  auth,
  dashboard,
  orgDetails,
  //   editor,
  //   home,
  //   profile,
  //   settings,
  router: routerReducer,
});
