import React, { memo } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { Box, useTheme } from "@mui/system";
import randomColor from "randomcolor";

const FeedbackTrend = (props) => {
  const theme = useTheme();
  const { graphData, labels } = props;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Feedbacks per month",
        data: graphData,
        borderColor: "#FF6484",
        backgroundColor: "rgba(255, 100, 132, 0.5)",
        lineTension: 0.2,
        radius: 6,
        fill: true,
      },
    ],
  };
  const graphOptions = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: true },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          // fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          callback: function(value) {if (value % 1 === 0) {return value;}}
          // min: 0,
          // precision: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider,
        },
      },
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };
  return (
    <Box sx={{ minHeight: "300px", maxHeight: "300px" }}>
      <Line data={data} options={graphOptions} />
    </Box>
  );
};

export default memo(FeedbackTrend);
