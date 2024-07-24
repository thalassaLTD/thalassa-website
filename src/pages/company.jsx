import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../components/Auth/Auth';
import CompanyBanner from '../components/Company/CompanyBanner';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Sidenav from '../components/NavBars/Sidenav';
import AmplitudeEvent from '../components/Amplitude/AmplitudeEvent';
import { Box } from '@mui/material';
import ResponsiveAppBar from "../components/NavBars/ResNav";

const baseURL = "https://api.joinuplyft.com";

function CompanyPage() {
  AmplitudeEvent("/company-loaded");

  const {id} = useParams();
  const { currentUser } = useContext(AuthContext);
   const [companyData, setCompanyData] = useState({});

  useEffect(() => {
    if(id){
    axios.post(baseURL + "/getInternship", {
      internship_id: id,
    })
      .then((response) => {
        setCompanyData(response.data);
      });}
  }, [id]);

  return (
    <>
     {currentUser?.uid && <ResponsiveAppBar/>}
      <Box sx={{ display: 'flex', height: "100%" }}>
        {currentUser?.uid && <Sidenav />}
        <Box component="main" sx={{ flexGrow: 1, height: "100%",textAlign:'justify' }}>
          <CompanyBanner companyData={companyData} />
        </Box>
      </Box>
    </>
  );
};

export default CompanyPage;
