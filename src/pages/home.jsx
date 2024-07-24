import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Sidenav from "../components/NavBars/Sidenav";
import AllInternships from "../components/Company/AllInternships";
import AmplitudeEvent from "../components/Amplitude/AmplitudeEvent";
import { Navigate } from "react-router-dom";
import EnrolledInternships from "../components/Company/EnrolledInternships";
import axios from "axios";
import { getCurrentUser, userId, get, post } from "../components/Helper";
import ResponsiveAppBar from "../components/NavBars/ResNav";
import Loading from "../components/commonComponents/Loading";
const baseURL = "https://api.joinuplyft.com";

export default function Home() {
  const [allInternships, setAllInternships] = useState(null);
  const [enrolled, setEnrolled] = useState([]);
  const [studentDetails, setStudentDetails] = useState(null);
  const currentUser = getCurrentUser();
  const [loading, setLoading] = useState(true);
  AmplitudeEvent("/home-loaded");

  useEffect(() => {
    axios
      .post(baseURL + "/getStudent", {
        googleuid: currentUser.uid,
      })
      .then((response) => {
        if (response.data) {
          setStudentDetails(response.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (studentDetails) {
      get("/getAllInternships")
        .then((data) => {
          let filtered = data.filter((item) => item.onboard === "DONE");
          setAllInternships(filtered);
          filtered = filtered.filter(
            (item) =>
              studentDetails.enrolled_internships?.length > 0 &&
              studentDetails.enrolled_internships.includes(item.project_id)
          );
          setEnrolled(filtered);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [studentDetails]);

  if (!currentUser) {
    return <Navigate to="/" />;
  }


    return (
      <>
        <ResponsiveAppBar />
        <Box sx={{ display: "flex", background: "#f3f5f7", pb: 6 }}>
          <Sidenav />
          {loading && <Loading/>}
          {!loading && allInternships && studentDetails && (
            <Box component="main" sx={{ flexGrow: 1 }}>
              {enrolled.length > 0 && currentUser && (
                <EnrolledInternships
                  internships={enrolled}
                  studentDetails={studentDetails}
                />
              )}
              <AllInternships
                internships={allInternships}
                studentDetails={studentDetails}
              />
            </Box>
          )}
        </Box>
      </>
    );
}
