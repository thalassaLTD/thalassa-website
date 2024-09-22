import React, { useState, useEffect } from "react";
import Sidenav from "../components/NavBars/Sidenav";
import { Box, Paper, MenuItem, Select, FormControl, InputLabel, Grid } from "@mui/material";
import MapFormatFilter from '../components/SpatialAnalytics/MapFormatFilter';
import YearFilter from '../components/SpatialAnalytics/YearFilter';
import TooltipHeader from '../components/TooltipHeader';
import CitySelector from "../components/TemporalAnimations/CitySelector";

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
      "Depression Growth Year-on-Year vs Items Per Patient Prior Year R-Squared"
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
            <TooltipHeader
              tooltipText="Choose filters and years to compare"
              headerText={spatialAnalyticsJsonData.HeadTitle}
              headerVariant="h4"
            />
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
                (Years must be actively de-selected and select one year at a time or go slow for bandwidth constrains)
              </Grid>
            </Grid>

            {/* Display the results below the filters */}
            {fileUrls.map(({ year, url }) => (
              url ? (
                <>
                  <iframe
                    key={year}
                    src={url}
                    style={{ width: '80%', height: '600px', border: 'none', marginBottom: '20px' }}
                    title={`Spatial Analysis for ${year}`}
                  />
                  <p> {spatialAnalyticsJsonData?.[mapFormat]?.[folder]?.[year]}</p>

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
