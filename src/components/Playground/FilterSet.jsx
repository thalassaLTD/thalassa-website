// components/FilterSet.jsx
import React from "react";
import { Paper, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, Tooltip } from "@mui/material";

const FilterSet = ({ title, selectedCity, setSelectedCity, mapFormat, setMapFormat, independentVariable, setIndependentVariable, dependentVariable, setDependentVariable, statisticalTest, setStatisticalTest, selectedYear, handleYearChange }) => {
  return (
    <Paper style={{ padding: 16 }}>
      <Tooltip title="Choose filters for analysis" arrow>
        <h2>{title}</h2>
      </Tooltip>

      <FormControl fullWidth sx={{ marginBottom: '20px' }}>
        <FormLabel component="legend">City</FormLabel>
        <Select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
          <MenuItem value="Greater London">Greater London</MenuItem>
          <MenuItem value="Manchester">Manchester</MenuItem>
          <MenuItem value="Birmingham">Birmingham</MenuItem>
        </Select>
      </FormControl>

      <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
        <FormLabel component="legend">Format</FormLabel>
        <RadioGroup name="mapFormat" value={mapFormat} onChange={(e) => setMapFormat(e.target.value)}>
          <FormControlLabel value="Cubes" control={<Radio />} label="Cubes" />
          <FormControlLabel value="Maps" control={<Radio />} label="Maps" />
        </RadioGroup>
      </FormControl>



      <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
        <FormLabel component="legend">Statistical Test</FormLabel>
        <RadioGroup name="statisticalTest" value={statisticalTest} onChange={(e) => setStatisticalTest(e.target.value)}>
          <FormControlLabel value="Depression Growth Year-on-Year vs Depression Prevalence Prior Year R-Squared" control={<Radio />} label="Depression Growth Year-on-Year vs Depression Prevalence Prior Year R-Squared" />
          <FormControlLabel value="Depression Growth Year-on-Year vs Items Per Patient Prior Year R-Squared" control={<Radio />} label="Depression Growth Year-on-Year vs Items Per Patient Prior Year R-Squared" />
          <FormControlLabel value="Depression Growth Year-on-Year vs Depression Prevalence Prior Year t-Value & R-Squared" control={<Radio />} label="Depression Growth Year-on-Year vs Depression Prevalence Prior Year t-Value & R-Squared" />
          <FormControlLabel value="Depression Growth Year-on-Year vs Items Per Patient Prior Year t-Value & R-Squared" control={<Radio />} label="Depression Growth Year-on-Year vs Items Per Patient Prior Year t-Value & R-Squared" />
        </RadioGroup>

      </FormControl>

      <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
        <FormLabel component="legend">Year</FormLabel>
        <RadioGroup value={selectedYear} onChange={handleYearChange} row>
          {Array.from({ length: 11 }, (_, i) => {
            const year = String(2014 + i);
            return (
              <FormControlLabel key={year} control={<Radio value={year} />} label={year} />
            );
          })}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default FilterSet;
