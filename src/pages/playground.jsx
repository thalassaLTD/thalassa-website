// playground.jsx
import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Sidenav from "../components/NavBars/Sidenav";
import FilterSet from "../components/Playground/FilterSet";

// utils/firebaseUtils.js
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const fetchFileUrl = async (city, format, statisticalTest, year) => {
  const storage = getStorage();
  const fileRef = ref(storage, `/Experiments/Spatial Analysis/${city}/${format}/${statisticalTest}/${year}.html`);
  try {
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error("Error fetching file:", error);
    return null;
  }
};

const FilterComponent = () => {
  // State for Set 1
  const [selectedCity1, setSelectedCity1] = useState('Greater London');
  const [mapFormat1, setMapFormat1] = useState('Cubes');
  const [statisticalTest1, setStatisticalTest1] = useState('Depression Growth Year-on-Year vs Depression Prevalence Prior Year R-Squared');
  const [selectedYear1, setSelectedYear1] = useState('2014'); // Single year selection
  const [fileUrl1, setFileUrl1] = useState('');

  // State for Set 2
  const [selectedCity2, setSelectedCity2] = useState('Greater London');
  const [mapFormat2, setMapFormat2] = useState('Cubes');
  const [statisticalTest2, setStatisticalTest2] = useState('Depression Growth Year-on-Year vs Depression Prevalence Prior Year R-Squared');
  const [selectedYear2, setSelectedYear2] = useState('2014'); // Single year selection
  const [fileUrl2, setFileUrl2] = useState('');

  // Handle year change for Set 1 (Single selection only)
  const handleYearChange1 = (event) => {
    const { value } = event.target;
    setSelectedYear1(value); // Only one year selected
  };

  // Handle year change for Set 2 (Single selection only)
  const handleYearChange2 = (event) => {
    const { value } = event.target;
    setSelectedYear2(value); // Only one year selected
  };

  useEffect(() => {
    fetchFileUrl(selectedCity1, mapFormat1, statisticalTest1, selectedYear1)
      .then(setFileUrl1);
  }, [selectedCity1, mapFormat1, statisticalTest1, selectedYear1]);

  useEffect(() => {
    fetchFileUrl(selectedCity2, mapFormat2, statisticalTest2, selectedYear2)
      .then(setFileUrl2);
  }, [selectedCity2, mapFormat2, statisticalTest2, selectedYear2]);

  return (
    <div className="bgcolor">
      <Box sx={{ display: "flex", height: "100%" }}>
        <Sidenav />
        <Box sx={{ padding: '20px', width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FilterSet
                title="Select Filters - Set 1"
                selectedCity={selectedCity1}
                setSelectedCity={setSelectedCity1}
                mapFormat={mapFormat1}
                setMapFormat={setMapFormat1}
                statisticalTest={statisticalTest1}
                setStatisticalTest={setStatisticalTest1}
                selectedYear={selectedYear1}
                handleYearChange={handleYearChange1} // Single year selection
              />
              <Box sx={{ height: 'calc(100vh - 200px)', overflow: 'hidden' }}>
                <iframe
                  src={fileUrl1}
                  style={{ width: '100%', height: '100%', border: 'none', overflow: 'hidden' }}
                  title="Set 1 Data">
                </iframe>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <FilterSet
                title="Comparison Set"
                selectedCity={selectedCity2}
                setSelectedCity={setSelectedCity2}
                mapFormat={mapFormat2}
                setMapFormat={setMapFormat2}
                statisticalTest={statisticalTest2}
                setStatisticalTest={setStatisticalTest2}
                selectedYear={selectedYear2}
                handleYearChange={handleYearChange2} // Single year selection
              />
              <Box sx={{ height: 'calc(100vh - 200px)' }}>
                <iframe src={fileUrl2} style={{ width: '100%', height: '100%', border: 'none' }} title="Set 2 Data"></iframe>
              </Box>
              <>{`/Experiments/Spatial Analysis/${selectedCity1}/${mapFormat1}/${statisticalTest1}/${selectedYear1}.html`}</>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default FilterComponent;
