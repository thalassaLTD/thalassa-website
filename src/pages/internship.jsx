import React, { useState, useEffect } from "react";
import SmoothScroll from "smooth-scroll";
import axios from "axios";
import { useParams } from 'react-router-dom';
import AmplitudeEvent from '../components/Amplitude/AmplitudeEvent'

import Sidenav from '../components/NavBars/Sidenav'
import InternshipBanner from '../components/Internship/InternshipBanner';

import {
  Box,
} from '@mui/material';
import ResponsiveAppBar from "../components/NavBars/ResNav";

const baseURL = "https://api.joinuplyft.com";

function CompanyPage() {
  AmplitudeEvent("/internship-loaded");
  const params = useParams();
  const [id, setId] = useState()

  useEffect(() => {
    setId(params["id"])
  }, [params])

  const [projectData, setProjectData] = useState({});

  useEffect(() => {
    id && axios.post(baseURL + "/getProject", {
      project_id: id,
    })
      .then((response) => {
        setProjectData(response.data);
      });
  }, [id])

  return (
    <>
     <ResponsiveAppBar/>
      <Box sx={{ display: 'flex' , height:"100%"}} className="bgcolor">
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, height:"100%",textAlign:'justify' }}>
          <InternshipBanner projectData={projectData} />
        </Box>
      </Box>
    </>
  );
};

export default CompanyPage;
