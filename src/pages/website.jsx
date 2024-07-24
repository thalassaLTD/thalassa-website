import React, { useState, useEffect } from "react";
import { Navigation } from "../components/LandingPage/navigation";
import { Header } from "../components/LandingPage/header";
import { Features } from "../components/LandingPage/features";
import { About } from "../components/LandingPage/about";
import { Services } from "../components/LandingPage/services";
import { Gallery } from "../components/LandingPage/gallery";
import { Testimonials } from "../components/LandingPage/testimonials";
import { Team } from "../components/LandingPage/Team";
import { Contact } from "../components/LandingPage/contact";
import JsonData from "../components/LandingPage/data.json";
import SmoothScroll from "smooth-scroll";
import AmplitudeEvent from '../components/Amplitude/AmplitudeEvent'
import { Navigate } from 'react-router-dom';
// import '../bootstrap/css/bootstrap.min.css';
//  import '../bootstrap/css/bootstrap.scss';

import { getCurrentUser, getUserId } from '../components/Helper';
import ProgramCarousal from "../components/Company/ProgramCarousal";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  AmplitudeEvent("/website-loaded");
  const currentUser = getCurrentUser();
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  if (currentUser) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="website-page">
      <Navigation />
      <Header data={landingPageData.Header} />
      <About data={landingPageData.About} />
      <Features data={landingPageData.Features} />
      <Services data={landingPageData.Services} />
      {<Gallery data={landingPageData.Gallery} />}
      { <Testimonials data={landingPageData.Testimonials} />}
      {/* { <Team data={landingPageData.Team} />} */}
      <ProgramCarousal/>
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default App;
