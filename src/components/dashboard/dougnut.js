import React, { memo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box } from "@mui/system";

const BugsPlatformChart = (props) => {
  const { labels = ["Android", "IOS", "Others"], graphData = [] } = props;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: graphData,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const plugins = [{
    beforeDraw: function(chart) {
     var width = chart.width,
         height = chart.height,
         ctx = chart.ctx;
         ctx.restore();
         var fontSize = (height / 160).toFixed(2);
         ctx.font = fontSize + "em sans-serif";
         ctx.textBaseline = "top";
         var text = graphData.reduce((partialSum, a) => partialSum + a, 0),
         textX = Math.round((width - ctx.measureText(text).width) / 2),
         textY = height / 2;
         ctx.fillText(text, textX, textY);
         ctx.save();
    } 
  }]

  return (
    <Box sx={{ minHeight: "300px", maxHeight: "300px" }}>
      <Doughnut
        data={data}
        options={{ responsive: true, maintainAspectRatio: false,  }}
        plugins={plugins} 
      />
    </Box>
  );
};

export default memo(BugsPlatformChart);
