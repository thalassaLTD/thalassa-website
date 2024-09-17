// playground.jsx
import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Sidenav from "../components/NavBars/Sidenav";
import FilterSet from "../components/Playground/FilterSet";
// import { fetchFileUrl } from "../utils/firebaseUtils";

// utils/firebaseUtils.js
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const fetchFileUrl = async (city, format, independentVariable, dependentVariable, statisticalTest, year) => {
  const storage = getStorage();
  const fileRef = ref(storage, `/Experiments/Spatial Analysis/${city}/${format}/${independentVariable}_${dependentVariable}_${statisticalTest}_${year}.html`);
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
  const [independentVariable1, setIndependentVariable1] = useState('Depression Prevalence Prior Year');
  const [dependentVariable1, setDependentVariable1] = useState('Depression Prevalence Current Year');
  const [statisticalTest1, setStatisticalTest1] = useState('R-Squared');
  const [selectedYears1, setSelectedYears1] = useState(['2012']);
  const [fileUrl1, setFileUrl1] = useState('');

  // State for Set 2
  const [selectedCity2, setSelectedCity2] = useState('Greater London');
  const [mapFormat2, setMapFormat2] = useState('Cubes');
  const [independentVariable2, setIndependentVariable2] = useState('Depression Prevalence Prior Year');
  const [dependentVariable2, setDependentVariable2] = useState('Depression Prevalence Current Year');
  const [statisticalTest2, setStatisticalTest2] = useState('R-Squared');
  const [selectedYears2, setSelectedYears2] = useState(['2012']);
  const [fileUrl2, setFileUrl2] = useState('');

  const handleYearChange1 = (event) => {
    const { value } = event.target;
    setSelectedYears1((prev) => prev.includes(value) ? prev.filter((year) => year !== value) : [...prev, value]);
  };

  const handleYearChange2 = (event) => {
    const { value } = event.target;
    setSelectedYears2((prev) => prev.includes(value) ? prev.filter((year) => year !== value) : [...prev, value]);
  };

  useEffect(() => {
    fetchFileUrl(selectedCity1, mapFormat1, independentVariable1, dependentVariable1, statisticalTest1, selectedYears1[0])
      .then(setFileUrl1);
  }, [selectedCity1, mapFormat1, independentVariable1, dependentVariable1, statisticalTest1, selectedYears1]);

  useEffect(() => {
    fetchFileUrl(selectedCity2, mapFormat2, independentVariable2, dependentVariable2, statisticalTest2, selectedYears2[0])
      .then(setFileUrl2);
  }, [selectedCity2, mapFormat2, independentVariable2, dependentVariable2, statisticalTest2, selectedYears2]);

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
                independentVariable={independentVariable1}
                setIndependentVariable={setIndependentVariable1}
                dependentVariable={dependentVariable1}
                setDependentVariable={setDependentVariable1}
                statisticalTest={statisticalTest1}
                setStatisticalTest={setStatisticalTest1}
                selectedYear={selectedYears1}
                handleYearChange={handleYearChange1}
              />
              <Box sx={{ height: 'calc(100vh - 200px)' }}>
                <iframe src={fileUrl1} style={{ width: '100%', height: '100%', border: 'none' }} title="Set 1 Data"></iframe>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <FilterSet
                title="Comparison Set"
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
                selectedYear={selectedYears2}
                handleYearChange={handleYearChange2}
              />
              <Box sx={{ height: 'calc(100vh - 200px)' }}>
                <iframe src={fileUrl2} style={{ width: '100%', height: '100%', border: 'none' }} title="Set 2 Data"></iframe>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default FilterComponent;
