import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../Helper";
import axios from "axios";
import Registration from "../../components/Registration";

const baseURL = "https://api.joinuplyft.com";

const ProtectedRoutesComponent = () => {
  let userAuth = getCurrentUser()?.uid;
  const [showRegistration, setShowRegistration] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);
  const fieldsToValidate = [
    "contact_number",
    "availability",
    "onsite_availability",
    "city",
    "preferred_city",
    "current_salary",
    "expected_salary",
    "state",
    "college",
    "degree",
    "passing_year",
    "key_skills",
    "career_interest",
  ];

  useEffect(() => {
    setTimeout(() => {
      if(userAuth && !isValidUserData(studentDetails)){
        axios
        .post(baseURL + "/getStudent", {
          googleuid: userAuth,
        })
        .then((response) => {
          if (response.data) {
            const check = isValidUserData(response.data);
            setShowRegistration(!check);
            setStudentDetails(response.data);
          }
        })
        .catch((error) => console.error(error));
      }
    }, 5000);
    
  }, []);

  const isValidUserData = (userData) => {
    if (!userData?.email) return false;
    return !fieldsToValidate.some(
      (key) =>
        userData?.[key] === undefined ||
        userData?.[key] === null ||
        userData?.[key] === ""
    );
  };

  if (userAuth) {
    return (
      <>
        <Outlet />
        {showRegistration && (
          <Registration
            open={showRegistration}
            studentDetails={studentDetails}
            onClose={() => setShowRegistration((prev) => !prev)}
          />
        )}
      </>
    );
  }
  if (!userAuth) {
    return <Navigate to="/" />;
  }
  // if(showRegistration) {
  //   return <Registration open={showRegistration} studentDetails={studentDetails} onClose={()=>setShowRegistration(prev=>!prev)}/>

  // }
};

export default ProtectedRoutesComponent;
