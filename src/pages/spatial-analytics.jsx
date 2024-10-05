import React, { useState, useEffect } from "react";
import Sidenav from "../components/NavBars/Sidenav";
import { Box, Paper, MenuItem, Select, FormControl, InputLabel, Grid, Typography, Divider } from "@mui/material";
import MapFormatFilter from '../components/SpatialAnalytics/MapFormatFilter';
import YearFilter from '../components/SpatialAnalytics/YearFilter';
import TooltipHeader from '../components/TooltipHeader';
import CitySelector from "../components/TemporalAnimations/CitySelector";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import spatialAnalyticsJsonData from "../customizeThalassa/pvt-spatialAnalyticsData.json";


// utils/firebaseUtils.js
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// import { format } from "react-number-format/types/numeric_format";

const FilterComponent = () => {
  const [mapFormat, setMapFormat] = useState('Cubes');
  const [folder, setFolder] = useState('Depression Growth Year-on-Year vs Depression Prevalence Prior Year R-Squared');
  const [selectedYears, setSelectedYears] = useState(['2014']);
  const [fileUrls, setFileUrls] = useState([]);
  const [selectedArea, setSelectedArea] = useState("Greater London");

  const cities = ["Greater London", "Leicester", "Manchester", "Bristol"];

  const folders = {
    Cubes: [
      "Depression Growth Year-on-Year vs Depression Prevalence Prior Year R-Squared",
      "Depression Growth Year-on-Year vs Depression Prevalence Prior Year t-Value & R-Squared",
      "Depression Growth Year-on-Year vs Items Per Patient Prior Year R-Squared",
      "Depression Growth Year-on-Year vs Items Per Patient Prior Year t-Value & R-Squared"
    ],
    Maps: [
      "Depression Growth Year-on-Year vs Depression Prevalence Prior Year R-Squared",
      "Depression Growth Year-on-Year vs Depression Prevalence Prior Year t-Value & R-Squared",
      "Depression Growth Year-on-Year vs Items Per Patient Prior Year R-Squared",
      "Depression Growth Year-on-Year vs Items Per Patient Prior Year t-Value & R-Squared"
    ]
  };

  const handleCityChange = (event) => {
    setSelectedArea(event.target.value);
  };

  const handleFolderChange = (event) => {
    setFolder(event.target.value);
  };

  const fetchFileUrls = async (city, format, folder, years) => {
    const storage = getStorage();
    const urls = [];

    for (const year of years) {
      const fileRef = ref(storage, `/Experiments/Spatial Analysis/${city}/${format}/${folder}/${year}.html`);
      try {
        const url = await getDownloadURL(fileRef);
        urls.push({ year, url });
      } catch (error) {
        console.error(`Error fetching file for year ${year}:`, error);
        urls.push({ year, url: null });
      }
    }

    return urls;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedYears.length > 0 && folder) {
        const urls = await fetchFileUrls(
          selectedArea,
          mapFormat,
          folder,
          selectedYears
        );
        setFileUrls(urls);
      }
    };

    fetchData();
  }, [mapFormat, folder, selectedYears, selectedArea]);

  return (
    <div className="bgcolor">
      <Box sx={{ display: "flex", height: "100%" }}>
        <Sidenav />
        <Box sx={{ padding: '20px', width: '100%' }}>
          <Paper style={{ padding: 16 }}>
            {/* <TooltipHeader
              tooltipText="Choose filters and years to compare"
              headerText={spatialAnalyticsJsonData.HeadTitle}
              headerVariant="h4"
            /> */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <h2 style={{ marginRight: 8 }}>{spatialAnalyticsJsonData.HeadTitle}</h2>
              {/* <Tooltip title="Overview of the experiements conducted so far." arrow>
                    <IconButton size="small" sx={{ verticalAlign: 'middle', padding: 0 }}>
                      <InfoIcon style={{ marginBottom: 16 }} />
                    </IconButton>
                  </Tooltip> */}

            </Box>

            <Accordion slotProps={{ heading: { component: 'h4' } }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ backgroundColor: 'lightgrey' }}

              >
                <strong> Summary of Analysis available here </strong>
              </AccordionSummary>
              <AccordionDetails>

                <strong> Depression Growth Drivers = DGD </strong>
                <br /> Exploratory Spatial Analysis over time and time snapshots
                <br />

                <br /> Cubes - LocalR2: Depression Prevelance vs Prior Year Items per Patient
                <br /> Cubes - LocalR2 & t-value: Depression Prevelance vs Prior Year Items per Patient
                <br /> Cubes - LocalR2: Depression Growth vs Prior Year Items per Patient
                <br /> Cubes - LocalR2 & t-value: Depression Growth vs Prior Year Items per Patient
                <br />
                <br /> Maps - LocalR2: Depression Growth vs Prior Year Depresssion Prevalence
                <br /> Maps - LocalR2 & t-value: Depression Prevelance vs Prior Year Items per Patient
                <br /> Maps - LocalR2: Depression Growth vs Prior Year Items per Patient
                <br /> Maps - LocalR2 & t-value: Depression Growth vs Prior Year Items per Patient
                <br /> <br />

              </AccordionDetails>
            </Accordion>

            <Grid item xs={12} sm={3}>
              <CitySelector selectedArea={selectedArea} handleCityChange={handleCityChange} cities={cities} />
            </Grid>
            {/* Use Grid layout for compact filters */}
            <Grid container spacing={2} alignItems="center">


              <Grid item xs={12} sm={2}>
                <MapFormatFilter mapFormat={mapFormat} setMapFormat={setMapFormat} />
              </Grid>

              <Grid item xs={12} sm={10}>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>Select Experiment</InputLabel>
                  <Select
                    value={folder}
                    onChange={handleFolderChange}
                    label="Select Experiment"
                  >
                    {folders[mapFormat]?.map((folderOption, index) => (
                      <MenuItem key={index} value={folderOption}>
                        {folderOption}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12}>
                <YearFilter selectedYears={selectedYears} setSelectedYears={setSelectedYears} />
              </Grid>

              <Grid item xs={12} sm={12}>
                (Be patient when selecting each year. Each year selected downloads a very large file to the website so it may take some time)
              </Grid>
            </Grid>
            <br />

            <Typography variant="h5"> {spatialAnalyticsJsonData?.[mapFormat]?.[folder]?.["Title"]}</Typography>

            {/* Display the results below the filters */}
            {fileUrls.map(({ year, url }) => (
              url ? (
                <>
                  <Typography variant="h5" sx={{ mt: 5, p: 1 }} >{year}</Typography>


                  <iframe
                    key={year}
                    src={url}
                    style={{ width: '80%', height: '600px', border: 'none', marginBottom: '20px' }}
                    title={`Spatial Analysis for ${year}`}
                  />
                  <p style={{ width: '80%', height: '600px', border: 'none', marginBottom: '20px' }}
                  > {spatialAnalyticsJsonData?.[mapFormat]?.[folder]?.[year]}</p>
                  <Divider></Divider>

                </>

              ) : (
                <p key={year}>No data available for {year}</p>
              )
            ))}

          </Paper>
        </Box>
      </Box>
    </div>
  );
};

export default FilterComponent;
