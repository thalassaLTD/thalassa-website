import React, { useState } from "react";
import Sidenav from "../components/NavBars/Sidenav";
import ResponsiveAppBar from "../components/NavBars/ResNav";
import { FormControl, FormLabel, FormControlLabel, Checkbox, Box, RadioGroup, Radio } from "@mui/material";
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const FilterComponent = () => {
  const [mapFormat, setMapForamt] = useState('Cubes'); // Default to "Cubes"
  const [independentVariable, setIndependentVariable] = useState('Depression Prevelance Prior Year'); // Default to "Depression Prevelance Prior Year"
  const [dependentVariable, setDependentVariable] = useState('Depression Prevelance Current Year'); // Default to "Depression Prevelance Current Year"
  const [statisticalTest, setStatisticalTest] = useState('R-Squared'); // Default to "R-Squared"
  const [selectedYears, setSelectedYears] = useState(['2012']);

  const handleYearChange = (event) => {
    const { value } = event.target;
    setSelectedYears((prev) =>
      prev.includes(value) ? prev.filter((year) => year !== value) : [...prev, value]
    );
  };

  return (
    <>
      <ResponsiveAppBar />
      <div className="bgcolor">

        <Box sx={{ display: "flex", height: "100%" }}>
          <Sidenav />
          <Box sx={{ padding: '20px' }}>
            <Tooltip title="Choose an independent and dependent variable and a statistical test and check the years you want to compare" arrow>
              <h2>Select Filters</h2>
            </Tooltip>

            {/* Map Format Filter */}
            <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
              <FormLabel component="legend">Format</FormLabel>
              <RadioGroup
                name="mapFormat"
                value={mapFormat}
                onChange={(e) => setMapForamt(e.target.value)}
              >
                <FormControlLabel value="Cubes" control={<Radio />} label="Cubes" />
                <FormControlLabel value="Maps" control={<Radio />} label="Maps" />
              </RadioGroup>
            </FormControl>

            {/* Independent Variable Filter */}
            <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
              <FormLabel component="legend">Independent Variable</FormLabel>
              <RadioGroup
                name="independentVariable"
                value={independentVariable}
                onChange={(e) => setIndependentVariable(e.target.value)}
              >
                <FormControlLabel value="Depression Prevelance Prior Year" control={<Radio />} label="Depression Prevelance Prior Year" />
                <FormControlLabel value="Items Per Patient Prior Year" control={<Radio />} label="Items Per Patient Prior Year" />
              </RadioGroup>
            </FormControl>

            {/* Dependent Variable Filter */}
            <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
              <FormLabel component="legend">Dependent Variable</FormLabel>
              <RadioGroup
                name="dependentVariable"
                value={dependentVariable}
                onChange={(e) => setDependentVariable(e.target.value)}
              >
                <FormControlLabel value="Depression Prevelance Current Year" control={<Radio />} label="Depression Prevelance Current Year" />
                <FormControlLabel value="Depression Growth Year-on-Year" control={<Radio />} label="Depression Growth Year-on-Year" />
              </RadioGroup>
            </FormControl>

            {/* Statistical Test Filter */}
            <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
              <FormLabel component="legend">Statistical Test</FormLabel>
              <RadioGroup
                name="statisticalTest"
                value={statisticalTest}
                onChange={(e) => setStatisticalTest(e.target.value)}
              >
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
                      control={
                        <Checkbox
                          checked={selectedYears.includes(year)}
                          onChange={handleYearChange}
                          value={year}
                        />
                      }
                      label={year}
                    />
                  );
                })}
              </Box>
            </FormControl>

            {/* Display Selected Filters */}
            <Box sx={{ marginTop: '20px' }}>
              <h3>Selected Filters:</h3>
              <p><strong>Independent Variable:</strong> {independentVariable}</p>
              <p><strong>Dependent Variable:</strong> {dependentVariable}</p>
              <p><strong>Statistical Test:</strong> {statisticalTest}</p>
              <p><strong>Years:</strong> {selectedYears.join(', ')}</p>
              <p><strong>File To Show from Firebase:</strong> /Experiments/Spatial Analysis/{mapFormat}_{independentVariable}_{dependentVariable}_{statisticalTest}_{selectedYears[0]}.html</p>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default FilterComponent;
