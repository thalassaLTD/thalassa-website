import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "@mui/material";
import Carousal from "../commonComponents/Carousal";
import { useEffect } from "react";
import { get } from "../Helper";
import { useState } from "react";
import ProgramCard from "./ProgramCard";

export default function CompanyCarousal() {
  const [programs, setPrograms] = useState();

  useEffect(() => {
    get("/getAllInternships").then((data) => {
      setPrograms(data);
    });
  }, []);

  if (programs) {
    return (
      <div className="container" style={{ padding: "100px 0" }}>
        <div className="section-title text-center">
          <h2>Our Programs</h2>
        </div>
        <Carousal>
          {programs.map((program) => (
            <ProgramCard internship={program} />
          ))}
        </Carousal>
      </div>
    );
  } else return null;
}
