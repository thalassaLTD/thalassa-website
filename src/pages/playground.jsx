import React, { useState, useEffect } from "react";
import Sidenav from "../components/NavBars/Sidenav";
import ResponsiveAppBar from "../components/NavBars/ResNav";
import { FormControl, FormLabel, FormControlLabel, Checkbox, Box, RadioGroup, Radio, Paper, Grid, Select, MenuItem } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // Import Firebase storage functions

// Reusable Filter Component
const FilterSet = ({ setTitle, selectedCity, setSelectedCity, mapFormat, setMapFormat, independentVariable, setIndependentVariable, dependentVariable, setDependentVariable, statisticalTest, setStatisticalTest, selectedYears, handleYearChange }) => {
  return (
    <Paper style={{ padding: 16 }}>
      <Tooltip title="Choose an independent and dependent variable, a statistical test, and check the years you want to compare" arrow>
        <h2>{setTitle}</h2>
      </Tooltip>

      {/* City Dropdown */}
      <FormControl fullWidth sx={{ marginBottom: '20px' }}>
        <FormLabel component="legend">City</FormLabel>
        <Select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
          <MenuItem value="London">London</MenuItem>
          <MenuItem value="Manchester">Manchester</MenuItem>
          <MenuItem value="Birmingham">Birmingham</MenuItem>
        </Select>
      </FormControl>

      {/* Map Format Filter */}
      <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
        <FormLabel component="legend">Format</FormLabel>
        <RadioGroup name="mapFormat" value={mapFormat} onChange={(e) => setMapFormat(e.target.value)}>
          <FormControlLabel value="Cubes" control={<Radio />} label="Cubes" />
          <FormControlLabel value="Maps" control={<Radio />} label="Maps" />
        </RadioGroup>
      </FormControl>

      {/* Independent Variable Filter */}
      <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
        <FormLabel component="legend">Independent Variable</FormLabel>
        <RadioGroup name="independentVariable" value={independentVariable} onChange={(e) => setIndependentVariable(e.target.value)}>
          <FormControlLabel value="Depression Prevalence Prior Year" control={<Radio />} label="Depression Prevalence Prior Year" />
          <FormControlLabel value="Items Per Patient Prior Year" control={<Radio />} label="Items Per Patient Prior Year" />
        </RadioGroup>
      </FormControl>

      {/* Dependent Variable Filter */}
      <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
        <FormLabel component="legend">Dependent Variable</FormLabel>
        <RadioGroup name="dependentVariable" value={dependentVariable} onChange={(e) => setDependentVariable(e.target.value)}>
          <FormControlLabel value="Depression Prevalence Current Year" control={<Radio />} label="Depression Prevalence Current Year" />
          <FormControlLabel value="Depression Growth Year-on-Year" control={<Radio />} label="Depression Growth Year-on-Year" />
        </RadioGroup>
      </FormControl>

      {/* Statistical Test Filter */}
      <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
        <FormLabel component="legend">Statistical Test</FormLabel>
        <RadioGroup name="statisticalTest" value={statisticalTest} onChange={(e) => setStatisticalTest(e.target.value)}>
          <FormControlLabel value="R-Squared" control={<Radio />} label="R-Squared" />
          <FormControlLabel value="T-Value" control={<Radio />} label="T-Value" />
        </RadioGroup>
      </FormControl>

      {/* Year Filter */}
      <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
        <FormLabel component="legend">Year</FormLabel>
        <Box>
          {Array.from({ length: 11 }, (_, i) => {
            const year = String(2012 + i);
            return (
              <FormControlLabel
                key={year}
                control={<Checkbox checked={selectedYears.includes(year)} onChange={handleYearChange} value={year} />}
                label={year}
              />
            );
          })}
        </Box>
      </FormControl>
    </Paper>
  );
};

const FilterComponent = () => {
  // State for Set 1
  const [selectedCity1, setSelectedCity1] = useState('London');
  const [mapFormat1, setMapFormat1] = useState('Cubes');
  const [independentVariable1, setIndependentVariable1] = useState('Depression Prevalence Prior Year');
  const [dependentVariable1, setDependentVariable1] = useState('Depression Prevalence Current Year');
  const [statisticalTest1, setStatisticalTest1] = useState('R-Squared');
  const [selectedYears1, setSelectedYears1] = useState(['2012']);
  const [fileUrl1, setFileUrl1] = useState(''); // Store the URL for the iframe

  // State for Set 2
  const [selectedCity2, setSelectedCity2] = useState('London');
  const [mapFormat2, setMapFormat2] = useState('Cubes');
  const [independentVariable2, setIndependentVariable2] = useState('Depression Prevalence Prior Year');
  const [dependentVariable2, setDependentVariable2] = useState('Depression Prevalence Current Year');
  const [statisticalTest2, setStatisticalTest2] = useState('R-Squared');
  const [selectedYears2, setSelectedYears2] = useState(['2012']);
  const [fileUrl2, setFileUrl2] = useState(''); // Store the URL for the iframe

  const handleYearChange1 = (event) => {
    const { value } = event.target;
    setSelectedYears1((prev) => prev.includes(value) ? prev.filter((year) => year !== value) : [...prev, value]);
  };

  const handleYearChange2 = (event) => {
    const { value } = event.target;
    setSelectedYears2((prev) => prev.includes(value) ? prev.filter((year) => year !== value) : [...prev, value]);
  };

  // Function to get Firebase storage URL
  const fetchFileUrl = async (city, format, independentVariable, dependentVariable, statisticalTest, year, setUrl) => {
    const storage = getStorage();
    const fileRef = ref(storage, `/Experiments/Spatial Analysis/${city}/${format}/${independentVariable}_${dependentVariable}_${statisticalTest}_${year}.html`);
    try {
      const url = await getDownloadURL(fileRef);
      setUrl(url); // Set the URL to display in iframe
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  // Fetch URLs when filters are changed
  useEffect(() => {
    fetchFileUrl(selectedCity1, mapFormat1, independentVariable1, dependentVariable1, statisticalTest1, selectedYears1[0], setFileUrl1);
  }, [selectedCity1, mapFormat1, independentVariable1, dependentVariable1, statisticalTest1, selectedYears1]);

  useEffect(() => {
    fetchFileUrl(selectedCity2, mapFormat2, independentVariable2, dependentVariable2, statisticalTest2, selectedYears2[0], setFileUrl2);
  }, [selectedCity2, mapFormat2, independentVariable2, dependentVariable2, statisticalTest2, selectedYears2]);

  return (
    <>
      <ResponsiveAppBar />
      <div className="bgcolor">
        <Box sx={{ display: "flex", height: "100%" }}>
          <Sidenav />
          <Box sx={{ padding: '20px', paddingRight: '0px', width: '100%' }}>
            <Grid container spacing={2} >
              <Grid item xs={6} >
                <FilterSet
                  setTitle="Select Filters - Set 1"
                  selectedCity={selectedCity1}
                  setSelectedCity={setSelectedCity1}
                  mapFormat={mapFormat1}
                  setMapFormat={setMapFormat1}
                  independentVariable={independentVariable1}
                  setIndependentVariable={setIndependentVariable1}
                  dependentVariable={dependentVariable1}
                  setDependentVariable={setDependentVariable1}
                  statisticalTest={statisticalTest1}
                  setStatisticalTest={setStatisticalTest1}
                  selectedYears={selectedYears1}
                  handleYearChange={handleYearChange1}
                />
                <Box sx={{ height: 'calc(100vh - 200px)' }}>
                  <iframe src={fileUrl1} style={{ width: '100%', height: '100%', border: 'none' }} title="Set 2 Data"></iframe>
                </Box>



              </Grid>

              <Grid item xs={6}>
                <FilterSet
                  setTitle="Comparison Set"
                  selectedCity={selectedCity2}
                  setSelectedCity={setSelectedCity2}
                  mapFormat={mapFormat2}
                  setMapFormat={setMapFormat2}
                  independentVariable={independentVariable2}
                  setIndependentVariable={setIndependentVariable2}
                  dependentVariable={dependentVariable2}
                  setDependentVariable={setDependentVariable2}
                  statisticalTest={statisticalTest2}
                  setStatisticalTest={setStatisticalTest2}
                  selectedYears={selectedYears2}
                  handleYearChange={handleYearChange2}
                />
                <Box sx={{ height: 'calc(100vh - 200px)' }}>
                  <iframe src={fileUrl2} style={{ width: '100%', height: '100%', border: 'none' }} title="Set 2 Data"></iframe>
                </Box>
              </Grid>
            </Grid>
            <p><strong>File To Show from Firebase:</strong> /Experiments/Spatial Analysis/{selectedCity2}/{mapFormat2}/{independentVariable2}_{dependentVariable2}_{statisticalTest2}_{selectedYears2[0]}.html</p>

          </Box>

        </Box>

      </div>
    </>
  );
};

export default FilterComponent;
