import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["A grade", 11],
  ["B grade", 7],
  ["C Grade", 2],
  ["Pending", 2],
  ["Reattend ", 2],
];

export const options = {
  title: "Status of Total Assignments You Applied for",
  pieHole: 0.4,
  is3D: false,
  colors:["rgb(53, 138, 178)" , "rgb(37, 11, 165)","rgb(40, 34, 70)","#f39f2a","#188310"]
};

export function PieChart() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"270px"}
    />
  );
}