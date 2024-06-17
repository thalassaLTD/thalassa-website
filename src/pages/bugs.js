import "../index.css";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard-layout";
import NativeSelect from "@mui/material/NativeSelect";
import {
  Box,
  Card,
  Typography,
  CardHeader,
  CardContent,
  Divider,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ReviewCard from "../components/reviews/reviewCard";
import RecommendationCard from "../components/reviews/recommendationCard";
import BugsCard from "../components/reviews/bugsCard";
import { getBugsData, getRecommendationData } from "../services";

const Graph = () => {
  const [analyticsData, setAnalytics] = useState();
  const [selectedTopic, setSelectedTopic] = useState();
  const [recommendations, setRecommendations] = useState();
  const [graphLabel, setGraphLabel] = useState("Other Issues");
  const getGraphDataFromAnalytics = (key) => {
    return analyticsData?.graphData?.[
      selectedTopic || Object.keys(analyticsData.graphData)[0]
    ]?.map((graphData) => graphData[key]);
  };

  const theme = useTheme();
  const graphData = {
    datasets: [
      {
        borderColor: "#EEEEEE",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 0,
        categoryPercentage: 0.5,
        data: getGraphDataFromAnalytics("count"),
        label: graphLabel,
        maxBarThickness: 10,
        backgroundColor: "#3F51B5",
      },
    ],
    labels: getGraphDataFromAnalytics("month"),
  };

  const sampleoptions = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
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
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0,
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

  const fetchBugsData = async () => {
    const bugsData = await getBugsData();
    const recommendations = await getRecommendationData();
    if (recommendations) setRecommendations(recommendations);
    if (bugsData) {
      setAnalytics(bugsData);
      setSelectedTopic(bugsData.graphDataOptions[0].name);
    }
  };

  useEffect(() => {
    fetchBugsData();
  }, []);
  const SelectTopic = () => {
    setGraphLabel(selectedTopic);
    return (
      <NativeSelect
        id="demo-customized-select-native"
        sx={{ color: "primary" }}
        onChange={(e) => setSelectedTopic(e.target.value)}
        value={selectedTopic}
        defaultValue={analyticsData?.graphDataOptions[0]}
        // value={age}
        // onChange={handleChange}
      >
        {analyticsData?.graphDataOptions?.map((option) => (
          <option value={option.name}>{option.name}</option>
        ))}
      </NativeSelect>
    );
  };
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h4">Bugs and Recommendations</Typography>
      {/* <Box sx={{ mt: 2 }}>
        <Card>
          <CardHeader
            title="Monthly frequency of bugs topic wise"
            action={<SelectTopic />}
          />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <Box sx={{ height: 400, position: "relative" }}>
                  <Bar data={graphData} options={sampleoptions} />
                </Box>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Box
                  sx={{
                    maxHeight: "400px",
                    overflowY: "auto",
                    pl: 2,
                  }}
                >
                  {analyticsData?.bugs
                    ?.filter((bug) => bug.labels.includes(selectedTopic))
                    .sort(
                      (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    )
                    .map((bug, i) => (
                      <>
                        <ReviewCard
                          key={`${i}`}
                          review={bug}
                          sx={{ mt: 1, p: 1 }}
                        />
                      </>
                    ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box> */}
      <Box sx={{ mt: 2, display: "flex", width: "100%", gap: 2 }}>
        <Card sx={{ flex: 1 }}>
          <CardHeader title="Bugs Detected" />
          <Divider />
          <CardContent sx={{ maxHeight: "400px", overflowY: "scroll" }}>
            {analyticsData?.bugs
              ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((bug, i) => (
                <>
                  <BugsCard key={`${i}`} review={bug} sx={{ mt: 0, p: 1 }} />
                </>
              ))}
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardHeader title="Customer Recommendations" />
          <Divider />
          <CardContent sx={{ maxHeight: "400px", overflowY: "scroll" }}>
            {recommendations
              ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((bug, i) => (
                <>
                  <RecommendationCard
                    key={`${i}`}
                    review={bug}
                    sx={{ mt: 0, p: 1 }}
                  />
                </>
              ))}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

const GraphWithLayout = (props) => {
  return (
    <DashboardLayout>
      <Graph {...props} />
    </DashboardLayout>
  );
};
export default GraphWithLayout;
