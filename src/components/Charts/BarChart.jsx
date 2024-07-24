import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["month", "Assignments", "Grade", "result"],
  ["jan", 30, "B", 200],
  ["feb", 11, 460, 250],
  ["mar", 6, 1120, 300],
  ["apr", 10, 540, 350],
];

export const options = {
  chart: {
    title: "Student Performance",
    subtitle: "Garde, Assignmaint, and result: jan-2023 - mar2023",
  },
  colors:["rgb(53, 138, 148)","rgb(37, 11, 165)","#188310"]
};

export default function BarChart() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="350px"
      data={data}
      options={options}
    />
  );
}
