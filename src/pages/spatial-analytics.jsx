import React, { useState, useEffect } from "react";
import Sidenav from "../components/NavBars/Sidenav";
import { Box, Paper } from "@mui/material";
import MapFormatFilter from '../components/SpatialAnalytics/MapFormatFilter';
import VariableFilter from '../components/SpatialAnalytics/VariableFilter';
import StatisticalTestFilter from '../components/SpatialAnalytics/StatisticalTestFilter';
import YearFilter from '../components/SpatialAnalytics/YearFilter';
import TooltipHeader from '../components/TooltipHeader';
import CitySelector from "../components/TemporalAnimations/CitySelector";

// utils/firebaseUtils.js
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const FilterComponent = () => {
  const [mapFormat, setMapFormat] = useState('Cubes');
  const [independentVariable, setIndependentVariable] = useState('Depression Prevelance Prior Year');
  const [dependentVariable, setDependentVariable] = useState('Depression Prevelance Current Year');
  const [statisticalTest, setStatisticalTest] = useState('R-Squared');
  const [selectedYears, setSelectedYears] = useState(['2012']);
  const [fileUrls, setFileUrls] = useState([]);
  const [selectedArea, setSelectedArea] = useState("Greater London"); // City selection state

  const cities = ["Greater London", "Leicester", "Manchester", "Bristol"]; // Available cities

  const handleCityChange = (event) => {
    setSelectedArea(event.target.value); // Update city selection
  };

  const fetchFileUrls = async (city, format, independentVariable, dependentVariable, statisticalTest, years) => {
    const storage = getStorage();
    const urls = [];
    
    for (const year of years) {
      const fileRef = ref(storage, `/Experiments/Spatial Analysis/${city}/${format}/${independentVariable} vs ${dependentVariable}/${statisticalTest}/${year}.html`);
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
      if (selectedYears.length > 0) {
        const urls = await fetchFileUrls(
          selectedArea,
          mapFormat,
          independentVariable,
          dependentVariable,
          statisticalTest,
          selectedYears
        );
        setFileUrls(urls);
      }
    };

    fetchData();
    console.log(`/Experiments/Spatial Analysis/${selectedArea}/${mapFormat}/${independentVariable} vs ${dependentVariable}/${statisticalTest}/${selectedYears[0]}.html`)
  }, [mapFormat, independentVariable, dependentVariable, statisticalTest, selectedYears, selectedArea]);

  return (
    <div className="bgcolor">
      <Box sx={{ display: "flex", height: "100%" }}>
        <Sidenav />
        <Box sx={{ padding: '20px' }}>
          <Paper style={{ padding: 16 }}>
            <TooltipHeader
              tooltipText="Choose filters and years to compare"
              headerText="Select Filters"
              headerVariant="h4"
            />

            <CitySelector selectedArea={selectedArea} handleCityChange={handleCityChange} cities={cities} />

            <MapFormatFilter mapFormat={mapFormat} setMapFormat={setMapFormat} />
            <VariableFilter
              independentVariable={independentVariable}
              setIndependentVariable={setIndependentVariable}
              dependentVariable={dependentVariable}
              setDependentVariable={setDependentVariable}
            />
            <StatisticalTestFilter statisticalTest={statisticalTest} setStatisticalTest={setStatisticalTest} />
            <YearFilter selectedYears={selectedYears} setSelectedYears={setSelectedYears} />

            {fileUrls.map(({ year, url }) => (
              url ? (
                <iframe
                  key={year}
                  src={url}
                  style={{ width: '100%', height: '500px', border: 'none', marginBottom: '20px' }}
                  title={`Spatial Analysis for ${year}`}
                />
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
