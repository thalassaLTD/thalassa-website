import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/dashboard-layout";
import {
  Box,
  Card,
  Typography,
  CardHeader,
  CardContent,
  TextField,
  SvgIcon,
  InputAdornment,
  Button,
  Divider,
} from "@mui/material";
import TopicIcon from "@mui/icons-material/Topic";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import { addKeywordTopics, getKeywordTopics } from "../services";
import Table from "../components/topics/table";

const CustomTopics = () => {
  const [topic, setTopic] = useState();
  const [keywords, setKeywords] = useState([]);
  const [topics, setTopics] = useState([]);
  const submitTopic = async () => {
    const data = {
      topic,
      words: keywords.reduce((keyString, word) => `${keyString},${word}`),
    };
    const isSuccess = await addKeywordTopics([data]);
    setTopics([...topics, data]);
  };

  const loadTopics = async () => {
    const topics = await getKeywordTopics();
    if (topics) setTopics(topics);
  };

  useEffect(() => {
    loadTopics();
  }, []);
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h4">Custom Topics</Typography>
      <Typography variant="p" sx={{ mt: 2 }}>
        Add topics you want to follow in the 'Reviews' section
      </Typography>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Grid
            container
            spacing={2}
            sx={{ justifyItems: "center", alignItems: "end" }}
          >
            <Grid item lg={4}>
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Add Topic
                </Typography>
                <TextField
                  size="small"
                  sx={{ width: "100%" }}
                  onChange={(e) => setTopic(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <TopicIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                    placeholder: "Add Topic",
                  }}
                />
              </Box>
            </Grid>
            <Grid item lg={4}>
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Add Keywords
                </Typography>{" "}
                <Autocomplete
                  multiple
                  size="small"
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={keywords}
                  value={keywords}
                  onChange={(e, list, reason, detail) => {
                    if (reason === "removeOption")
                      setKeywords(
                        keywords.filter((keyword) => keyword !== detail.option)
                      );
                  }}
                  //   defaultValue={}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Favorites"
                      onKeyUp={(e) => {
                        if (e.keyCode === 13)
                          setKeywords([...keywords, e.target.value]);
                      }}
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item lg={2}>
              <Box>
                <Button onClick={submitTopic} variant="contained">
                  + Add Topic
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 1 }}>
        <CardContent>
          <Table rows={topics} />
        </CardContent>
      </Card>
    </Box>
  );
};

const CustomTopicsWithLayout = (props) => {
  return (
    <DashboardLayout>
      <CustomTopics {...props} />
    </DashboardLayout>
  );
};
export default CustomTopicsWithLayout;
