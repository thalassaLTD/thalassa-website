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
import ProjectOverview from "./pages/project-overview";
import SpatialAnalytics from "./pages/spatial-analytics";
import Figure from "./pages/figure";
import Animations from "./pages/animations";
import Playground from "./pages/playground";
// import CaseStudies from "./pages/case-studies";
import NewVaccineImpactOnFishFarms from "./pages/new-vaccine-impact-on-fish-farms";
import ModellingDepressionInPandemic from "./pages/modelling-depression-in-pandemic";
import InvestigationOfSolarEnergyGeneration from "./pages/investigation-of-solar-energy-generation";

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

            {/* <Route exact path='/case-studies' element={<CaseStudies />}></Route> */}
            <Route path="/new-vaccine-impact-on-fish-farms" element={<NewVaccineImpactOnFishFarms />}></Route>
            <Route path="/modelling-depression-in-pandemic" element={<ModellingDepressionInPandemic />}></Route>
            <Route path="/investigation-of-solar-energy-generation" element={<InvestigationOfSolarEnergyGeneration />}></Route>

            {/* <Route exact path='/case-studies' element={<CaseStudies />}></Route> */}
            {/* <Route exact path="/services/service1" element={<CaseStudies />} />
            <Route exact path="/case-studies/case3" element={<CaseStudies />} /> */}


            <Route
              element={<ProtectedRoutesComponent />}
            >
              <Route exact path='/project-overview' element={<ProjectOverview />}></Route>
              <Route exact path='/animations' element={<Animations />}></Route>
              <Route exact path='/spatial-analytics' element={<SpatialAnalytics />}></Route>
              <Route exact path='/playground' element={<Playground />}></Route>
              <Route exact path='/account' element={<Profile />}></Route>
              <Route exact path='/terms' element={<TermsAndConditions />}></Route>
              <Route exact path='/Experiments' element={<Figure />}></Route>      
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </AuthProvider>
  );
};

export default App;
