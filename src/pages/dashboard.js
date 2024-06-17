import DashboardLayout from "../components/dashboard-layout";
import React, { useState, useEffect } from "react";
import { TagCloud } from "react-tagcloud";
import { getWordCloud, getMixGraph } from "../services";
import {
  Box,
  Card,
  Typography,
  CardHeader,
  CardContent,
  Divider,
  Grid,
} from "@mui/material";
import IssuesGraph from "../components/dashboard/issuesMonthly";
import { Tooltip } from "recharts";
import BugsPlatformChart from "../components/dashboard/dougnut";
import { loadDashboardData } from "../services/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import FeedbackTrend from "../components/dashboard/feedbackTrend";
import randomColor from "randomcolor";

const WatchList = () => {
  const dispatch = useDispatch;
  const dashboardGraphs = useSelector(
    ({ dashboard: { dashboardGraphs } }) => dashboardGraphs
  );
  const [pdata, setPdata] = useState();
  const [bugs, setTotalBugs] = useState([]);
  const [monthlyGraphData, setMonthlyGraphData] = useState();
  const [topicpdata, setTopicPdata] = useState();
  const [hover, setHover] = useState(false);
  const [hoverContent, setHoverContent] = useState(false);
  const [topic, setTopic] = useState();
  const [val, setVal] = useState();
  const [tagcloudData, setTagcloudData] = useState([
    { value: "WordCloud", count: 0 },
  ]);

  const [options, setOptions] = useState([]);

  const loadWordCloud = async () => {
    const wordCloud = await getWordCloud();
    if (wordCloud) setTagcloudData(wordCloud);
  };

  const loadMixGraph = async () => {
    const mixGraph = await getMixGraph();
    if (mixGraph) {
      setPdata(mixGraph.pdata);
      setMonthlyGraphData(mixGraph.graphData);
      setOptions(mixGraph.mixed_graph_options);
      setTotalBugs(mixGraph.bugs);
    }
  };

  useEffect(() => {
    loadMixGraph();
    loadWordCloud();
    loadDashboardData(dispatch);
  }, []);

  const onHover = (tag, count) => {
    setHover(true);
    setHoverContent({ tag: tag, count: count });
  };

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h4">App Analytics</Typography>
      {dashboardGraphs && (
        <>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Bugs Reported - Monthly" />
                <Divider />
                <CardContent>
                  <FeedbackTrend
                    graphData={dashboardGraphs?.issues_topic_wise2?.datasets}
                    labels={dashboardGraphs?.issues_topic_wise2?.labels}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="User Feedback - Trend" />
                <Divider />
                <CardContent>
                  <FeedbackTrend
                    graphData={dashboardGraphs?.feedback_trend.datasets}
                    labels={dashboardGraphs?.feedback_trend.labels}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Bugs Reported - By Platform" />
                <Divider />
                <CardContent>
                  <BugsPlatformChart
                    graphData={dashboardGraphs?.bugs_by_source_doughnut.dataset}
                    labels={dashboardGraphs?.bugs_by_source_doughnut.labels}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="User Feedback - By Platform" />
                <Divider />
                <CardContent>
                  <BugsPlatformChart
                    graphData={dashboardGraphs?.source_doughnut.dataset}
                    labels={dashboardGraphs?.source_doughnut.labels}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card>
                <CardHeader title="Reviews Volume- Custom Topic Based(You can add these in 'Custom Topics' Section)" />
                <Divider />
                <CardContent>
                  <IssuesGraph
                    graphData={dashboardGraphs?.issues_topic_wise.datasets.map(
                      ({ data, label }) => ({
                        barPercentage: 0.5,
                        barThickness: 12,
                        borderRadius: 0,
                        categoryPercentage: 0.5,
                        data: data,
                        label: label,
                        maxBarThickness: 10,
                        borderColor: randomColor({
                          luminosity: "dark",
                          format: "rgba",
                          alpha: 0.5,
                        }),
                        lineTension: 0.2,
                        radius: 6,
                      })
                    )}
                    labels={dashboardGraphs?.issues_topic_wise.labels}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* <Card sx={{ pb: 2, mt: 2 }}>
            <CardHeader title={`Frequently used in reviews`} />
            <Divider />
            <Typography variant="h6" sx={{ pl: 3, pt: 2 }}>
              {`${hoverContent.tag}: ${hoverContent.count}`}
            </Typography>
            <CardContent sx={{ p: 2, cursor: "pointer" }}>
              <TagCloud
                minSize={10}
                maxSize={55}
                tags={tagcloudData}
                onMouseMove={(tag) => onHover(tag.value, tag.count)}
              />
            </CardContent>
          </Card> */}
        </>
      )}
    </Box>
  );
};

const WatchListWithLayout = (props) => {
  return (
    <DashboardLayout>
      <WatchList {...props} />
    </DashboardLayout>
  );
};

export default WatchListWithLayout;
