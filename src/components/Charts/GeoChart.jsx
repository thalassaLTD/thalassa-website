import React from 'react'
import { Chart } from "react-google-charts";

export const data = [
  ["Country", "Assignment"],
  ["Germany", 1],
  ["United States", 2],
  ["Brazil", 4],
  ["Canada", 6],
  ["France", 7],
  ["india", 8],
];

export default function GeoChart() {
  return (
    <Chart
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length === 0) return;
            const region = data[selection[0].row + 1];
            console.log("Selected : " + region);
          },
        },
      ]}
      chartType="GeoChart"
      width="100%"
      height="300px"
      data={data}
    />
  );
}
