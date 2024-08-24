import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useRoutes,
  Navigate,
  Redirect,
} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/Auth/Auth";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import TermsAndConditions from "./components/Auth/TermsAndConditions";
import Website from "./pages/website";
import SpatialAnalytics from "./pages/spatialAnalytics";
import Animations from "./pages/animations";
import CaseStudies from "./pages/caseStudies";
import Profile from "./pages/profile";
import SmoothScroll from "smooth-scroll";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./pages/ErrorFallback";
// import { getCurrentUser } from "./components/Helper";
import ProtectedRoutesComponent from "./components/commonComponents/ProtectedRoutesComponent";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  return (
    <AuthProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Website />} />
            <Route path="*" element={<Navigate to="/" />} />

            <Route exact path='/case-studies' element={<CaseStudies />}></Route>
            <Route path="/service1" element={<CaseStudies />}></Route>

            {/* <Route exact path='/case-studies' element={<CaseStudies />}></Route> */}
            {/* <Route exact path="/services/service1" element={<CaseStudies />} />
            <Route exact path="/case-studies/case3" element={<CaseStudies />} /> */}

            
            <Route
              element={<ProtectedRoutesComponent />}
            >
              <Route exact path='/home' element={<Animations />}></Route>
              <Route exact path='/animations' element={<Animations />}></Route>
              <Route exact path='/spatial-analytics' element={<SpatialAnalytics />}></Route>
              <Route exact path='/account' element={<Profile />}></Route>
              <Route exact path='/terms' element={<TermsAndConditions />}></Route>

            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </AuthProvider>
  );
};

export default App;
