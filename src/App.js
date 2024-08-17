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
// import Home from "./pages/home";
import MP4s from "./pages/mp4s";
import CubePlots from "./pages/cubePlots";
import BokehInteractions from "./pages/bokehInteractions";
import Experiments from "./pages/experiments";
import Jobs from "./pages/jobs";
import CaseStudies from "./pages/caseStudies";
import Profile from "./pages/profile";
// import CompanyPage from "./pages/company";
// import InternshipPage from "./pages/internship";
import SmoothScroll from "smooth-scroll";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./pages/ErrorFallback";
// import { getCurrentUser } from "./components/Helper";
import ProtectedRoutesComponent from "./components/commonComponents/ProtectedRoutesComponent";
// import Certificate from "../src/components/certificateGenretor/Certificate";

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
            <Route exact path='/case-studies' element={<Jobs />}></Route>
            <Route path="/service1" element={<Jobs />}></Route>

            {/* <Route exact path='/case-studies' element={<CaseStudies />}></Route> */}
            {/* <Route exact path="/services/service1" element={<CaseStudies />} />
            <Route exact path="/services/service2" element={<CaseStudies />} />
            <Route exact path="/services/service3" element={<CaseStudies />} />
            <Route exact path="/insights/insight1" element={<CaseStudies />} />
            <Route exact path="/insights/insight2" element={<CaseStudies />} />
            <Route exact path="/insights/insight3" element={<CaseStudies />} />
            <Route exact path="/case-studies/case1" element={<CaseStudies />} />
            <Route exact path="/case-studies/case2" element={<CaseStudies />} />
            <Route exact path="/case-studies/case3" element={<CaseStudies />} /> */}
            <Route
              element={<ProtectedRoutesComponent />}
            >
              <Route exact path='/home' element={<Experiments />}></Route>
              <Route exact path='/experiments' element={<Experiments />}></Route>
              <Route exact path='/mp4s' element={<MP4s />}></Route>
              <Route exact path='/bokeh-interactions' element={<BokehInteractions />}></Route>
              <Route exact path='/cube-plots' element={<CubePlots />}></Route>

              <Route exact path='/account' element={<Profile />}></Route>
              <Route exact path='/terms' element={<TermsAndConditions />}></Route>


              {/* <Route exact path='/company/:id' element={<CompanyPage />}></Route>               */}
              {/* <Route exact path='/internship/:id' element={<InternshipPage />}></Route> */}
              {/* <Route exact path='/certificate' element={<Certificate />}></Route> */}

            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </AuthProvider>
  );
};

export default App;
