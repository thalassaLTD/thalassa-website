import React, { memo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box } from "@mui/system";

const BugsPlatformChart = (props) => {
  const { bugs = [] } = props;
  let android = 0;
  let ios = 0;
  let others = 0;
  bugs.forEach((bug) => {
    bug.source === "appstore"
      ? ios++
      : bug.source === "playstore"
      ? android++
      : others++;
  });
  const data = {
    labels: ["Android", "IOS", "Others"],
    datasets: [
      {
        label: "My First Dataset",
        data: [android, ios, others],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <Box sx={{ minHeight: "300px", maxHeight: "300px" }}>
      <Doughnut
        data={data}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </Box>
  );
};

export default memo(BugsPlatformChart);
