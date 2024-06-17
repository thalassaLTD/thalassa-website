import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Pagination,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../components/dashboard-layout";
import { CustomerListToolbar } from "../components/appReviews/toolbar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import { Search as SearchIcon } from "../icons/search";
import { fetchDashboardData } from "../services";
import ReviewCard from "../components/reviews/reviewCard";
import { setDashboardDataAction } from "../store/actions";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const AppReviews = (reviews) => {
  const PER_PAGE = 10;
  const dispatch = useDispatch();
  const [companyName, setCompnyName] = useState("");
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [fetchedTweetsData, setFetchedTweetsData] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalLabels, setTotalLabels] = useState([]);
  const [tweetsWithFilter, setTweetsWithFilter] = useState([]);
  const [isDataLoading, setDataLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [userFootPrint, setUserFootPrint] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const onSubmit = (company) => {
    loadDasboard();
  };

  const loadDasboard = async (company) => {
    try {
      setDataLoading(true);
      const data = await fetchDashboardData();
      if (data) setFetchedTweetsData(data);
      if (data.labels) setTotalLabels(data.labels);
      if (data.feedback) setTweetsWithFilter(data.feedback);
      setSelectedLabels([]);
      setPageNumber(1);
      dispatch(setDashboardDataAction(data));
      setDataLoading(false);
    } catch (err) { }
  };

  useEffect(() => {
    loadDasboard();
  }, []);

  const handleChipSelection = (label) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(
        selectedLabels.filter((selectedLabel) => selectedLabel !== label)
      );
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  const handlePageChange = (e, p) => {
    setPageNumber(p);
  };

  useEffect(() => {
    if (!fetchedTweetsData) return;
    let filteredTweets = [];
    if (selectedLabels.length) {
      selectedLabels.forEach((selectedLabel) =>
        fetchedTweetsData.feedback.forEach((tweet) => {
          if (tweet.labels.includes(selectedLabel.split("(")[0]))
            filteredTweets.push(tweet);
        })
      );
    } else {
      setTweetsWithFilter(fetchedTweetsData.feedback);
      filteredTweets = fetchedTweetsData.feedback;
    }
    let searchFilteredTweets = filteredTweets.filter(
      (tweet) => tweet.text.toUpperCase().indexOf(searchText.toUpperCase()) > -1
    );
    if (fromDate || toDate) {
      console.log("from and to date selected==>", fromDate, toDate);
      const fd = new Date(fromDate).getTime();
      const td = new Date(toDate).getTime();
      if (fromDate && toDate) {
        searchFilteredTweets = searchFilteredTweets.filter((d) => {
          var time = new Date(d.created_at).getTime();
          return fd < time && time < td;
        });
        console.log("from and to ==>", searchFilteredTweets);
      } else if (!toDate) {
        searchFilteredTweets = searchFilteredTweets.filter((d) => {
          var time = new Date(d.created_at).getTime();
          return fd < time;
        });
      } else if (!fromDate) {
        searchFilteredTweets = searchFilteredTweets.filter((d) => {
          var time = new Date(d.created_at).getTime();
          return time < td;
        });
      }
    }
    setTweetsWithFilter(searchFilteredTweets);
  }, [selectedLabels, fetchedTweetsData, searchText, fromDate, toDate]);

  const pagedData = tweetsWithFilter.length
    ? tweetsWithFilter.slice(
      (pageNumber - 1) * PER_PAGE,
      (pageNumber - 1) * PER_PAGE + PER_PAGE
    )
    : [];

  // React.useEffect(() => {
  //   fetch(
  //     "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setUserFootPrint(data);
  //     });
  // }, []);

  // React.useEffect(() => {
  //   axios
  //     .post("https://api.thalassa.com/user_foot_print", userFootPrint)
  //     .then((response) => {});
  // }, [userFootPrint]);

  return (
    <Box component="main" sx={{ m: 2 }}>
      <CustomerListToolbar
        onComapnyChnage={(e) => setCompnyName(e.target.value)}
        companyName={companyName}
        onSubmit={onSubmit}
      />
      {totalLabels.length > 0 && (
        <Box sx={{ mt: 1, mb: 1, boxSizing: "border-box" }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6">Filter by Topic (You can add these topics in 'Custom Topics' Section)</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ width: "1000%", overflow: "auto" }}
                    className="labelHorizontal-scroll"
                  >
                    {isDataLoading ? (
                      <Skeleton sx={{ width: "100%" }} />
                    ) : (
                      <>
                        {totalLabels.map((label) => (
                          <Chip
                            color="primary"
                            variant={
                              selectedLabels.includes(label)
                                ? "contained"
                                : "outlined"
                            }
                            label={label}
                            onClick={() => handleChipSelection(label)}
                          />
                        ))}
                      </>
                    )}
                  </Stack>
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Pagination
                      color="primary"
                      page={pageNumber}
                      count={Math.ceil(tweetsWithFilter.length / 10)}
                      onChange={handlePageChange}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Box>
                <TextField
                  size="small"
                  sx={{ minWidth: 500 }}
                  onChange={(e) => setSearchText(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                    placeholder: "Search reviews",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ marginRight: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Filter from"
                      value={fromDate}
                      maxDate={new Date()}
                      onChange={(newValue) => {
                        setFromDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} size="small" />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Filter upto"
                      value={toDate}
                      minDate={fromDate ? fromDate : undefined}
                      onChange={(newValue) => {
                        setToDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} size="small" />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>
      )}
      <Box>
        {isDataLoading ? (
          <>
            <LoaderSkeleton />
            <LoaderSkeleton />
          </>
        ) : fetchedTweetsData ? (
          <Box>
            {pagedData.map((review) => (
              <ReviewCard review={review} />
            ))}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                color="primary"
                size="small"
                page={pageNumber}
                count={Math.ceil(tweetsWithFilter.length / 10)}
                onChange={handlePageChange}
              />
            </Box>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

const AppReviewsWithLayout = () => {
  return (
    <DashboardLayout>
      <AppReviews />
    </DashboardLayout>
  );
};

export default AppReviewsWithLayout;

const LoaderSkeleton = () => {
  return (
    <Card sx={{ p: 2, mb: 1 }}>
      <Skeleton
        sx={{
          height: "40px",
          borderRadius: 0,
          display: "inline-block",
          width: "100%",
        }}
      />
      <Skeleton
        sx={{
          height: "40px",
          borderRadius: 0,
          display: "inline-block",
          width: "100%",
        }}
      />
      <Skeleton
        sx={{
          height: "40px",
          borderRadius: 0,
          display: "inline-block",
          width: "100%",
        }}
      />
      <Skeleton
        sx={{
          height: "40px",
          borderRadius: 0,
          display: "inline-block",
          width: "10%",
        }}
      />
    </Card>
  );
};
