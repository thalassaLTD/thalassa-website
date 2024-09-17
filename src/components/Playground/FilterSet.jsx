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
        <FormLabel component="legend">Independent Variable</FormLabel>
        <RadioGroup name="independentVariable" value={independentVariable} onChange={(e) => setIndependentVariable(e.target.value)}>
          <FormControlLabel value="Depression Prevalence Prior Year" control={<Radio />} label="Depression Prevalence Prior Year" />
          <FormControlLabel value="Items Per Patient Prior Year" control={<Radio />} label="Items Per Patient Prior Year" />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
        <FormLabel component="legend">Dependent Variable</FormLabel>
        <RadioGroup name="dependentVariable" value={dependentVariable} onChange={(e) => setDependentVariable(e.target.value)}>
          <FormControlLabel value="Depression Prevalence Current Year" control={<Radio />} label="Depression Prevalence Current Year" />
          <FormControlLabel value="Depression Growth Year-on-Year" control={<Radio />} label="Depression Growth Year-on-Year" />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
        <FormLabel component="legend">Statistical Test</FormLabel>
        <RadioGroup name="statisticalTest" value={statisticalTest} onChange={(e) => setStatisticalTest(e.target.value)}>
          <FormControlLabel value="R-Squared" control={<Radio />} label="R-Squared" />
          <FormControlLabel value="T-Value" control={<Radio />} label="T-Value" />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
        <FormLabel component="legend">Year</FormLabel>
        <RadioGroup value={selectedYear} onChange={handleYearChange} row>
          {Array.from({ length: 11 }, (_, i) => {
            const year = String(2012 + i);
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
