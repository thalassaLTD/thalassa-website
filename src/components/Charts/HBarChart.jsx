import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Assignmnet", "Last Month", "Current"],
  ["Road construction", 10, 7],
  ["Computational Fluid Dynamics", 8, 5],
  ["CAD For Designing", 9, 8],
  ["Construction Machinery", 10, 6],
  ["Residential Sales", 4, 2],
];

export const options = {
  title: "Your Current and Previus Assignment Score By Mentor",
  chartArea: { width: "50%" },
  hAxis: {
    title: "Grade",
    minValue: 0,
  },
  vAxis: {
    title: "Assignment",
  },
    colors: ["rgb(53, 138, 148)","rgb(40, 34, 70)"],
};

export default function HBarChart() {
  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="300px"
      data={data}
      options={options}
    />
  );
}
