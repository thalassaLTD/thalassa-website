import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import PageNotFound from "../archives/404";
// import LoginPage from "../pages/home";
import LoginPage from "../pages/login";
import Website from "../pages/website";
import RegisterPage from "../archives/register";
// import Dashboard from "../pages/dashboard";
import AppReviews from "../pages/reviews";
import Settings from "../archives/settings";
import Accounts from "../pages/accounts";
import SavedReviews from "../archives/savedReviews";
import Bugs from "../pages/bugs";
import CustomTopics from "../pages/customTopics";
import Dashboard from "../pages/dashboard";
import ProtectedRoute from "./privateRoute";
import { setAuthToken } from "../services/config";

export const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <div>
        <Routes>
          {/* <Route path="/" element={<Dashboard />} exact={true} /> */}
          <Route element={<ProtectedRoute user={false} />}>
            <Route path="/dashboard" element={<Dashboard />} exact={true} />
            <Route
              path="/saved-reviews"
              element={<SavedReviews />}
              exact={true}
            />
            <Route
              path="/custom-topics"
              element={<CustomTopics />}
              exact={true}
            />
            <Route path="/reviews" element={<AppReviews />} exact={true} />
            <Route path="/bugs" element={<Bugs />} exact={true} />
            <Route path="/account" element={<Accounts />} exact={true} />
            {/* <Route path="/appReviews" element={<AppReviews />} exact={true} /> */}
            <Route path="/settings" element={<Settings />} exact={true} />
          </Route>
          <Route path="/login" element={<LoginPage />} exact={true} />
          <Route path="/" element={<Website />} exact={true} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
