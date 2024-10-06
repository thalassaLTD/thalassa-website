import React from "react";
import {
  Paper,
  FormControl,
  InputLabel,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Tooltip
} from "@mui/material";

const FilterSet = ({
  title,
  selectedCity,
  setSelectedCity,
  mapFormat,
  setMapFormat,
  independentVariable,
  setIndependentVariable,
  dependentVariable,
  setDependentVariable,
  statisticalTest,
  setStatisticalTest,
  selectedYear,
  handleYearChange
}) => {

  // Options for different formats
  const getStatisticalTestOptions = () => {
    if (mapFormat === "Temporal Animations") {
      return [
        { value: "Depression Prevalence (DPR)", label: "Depression Prevalence (DPR)" },
        { value: "Prescription Prevalence (PPR)", label: "Prescription Prevalence (PPR)" },
        { value: "Depression Growth Drivers (DGD)", label: "Depression Growth Drivers (DGD)" },
        { value: "Morans I Depression Prevalence (BTP)", label: "Morans I Depression Prevalence (BTP)" }
      ];
    }
    return [
      {
        value: "Depression Growth Year-on-Year vs Depression Prevalence Prior Year R-Squared",
        label:
          "Depression Growth Year-on-Year vs Depression Prevalence Prior Year R-Squared"
      },
      {
        value:
          "Depression Growth Year-on-Year vs Depression Prevalence Prior Year t-Value & R-Squared",
        label:
          "Depression Growth Year-on-Year vs Depression Prevalence Prior Year t-Value & R-Squared"
      },
      {
        value: "Depression Growth Year-on-Year vs Items Per Patient Prior Year R-Squared",
        label:
          "Depression Growth Year-on-Year vs Items Per Patient Prior Year R-Squared"
      },
      {
        value:
          "Depression Growth Year-on-Year vs Items Per Patient Prior Year t-Value & R-Squared",
        label:
          "Depression Growth Year-on-Year vs Items Per Patient Prior Year t-Value & R-Squared"
      }
    ];
  };

  // Function to get video options if the format is "Temporal Animations"
  const getAnimationFiles = () => {
    switch (statisticalTest) {
      case "Depression Prevalence (DPR)":
        return ["DPR1.mp4", "DPR2.mp4"];
      case "Prescription Prevalence (PPR)":
        return ["PPR1.mp4", "PPR2.mp4", "PPR3.mp4"];
      case "Depression Growth Drivers (DGD)":
        return ["DGD1.mp4", "DGD2.mp4", "DGD3.mp4", "DGD4.mp4", "DGD5.mp4"];
      case "Morans I Depression Prevalence (BTP)":
        return ["BTP4.mp4"];
      default:
        return [];
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Tooltip title="Choose filters for analysis" arrow>
        <h2>{title}</h2>
      </Tooltip>

      <FormControl fullWidth sx={{ marginBottom: "20px" }}>
        <FormLabel component="legend">City</FormLabel>
        <Select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <MenuItem value="Greater London">Greater London</MenuItem>
          <MenuItem value="Manchester">Manchester</MenuItem>
          <MenuItem value="Birmingham">Birmingham</MenuItem>
        </Select>
      </FormControl>

      <FormControl component="fieldset" sx={{ marginBottom: "20px" }}>
        <FormLabel component="legend">Format</FormLabel>
        <RadioGroup
          name="mapFormat"
          value={mapFormat}
          onChange={(e) => setMapFormat(e.target.value)}
        >
          <FormControlLabel
            value="Cubes"
            control={<Radio />}
            label="3D Visualisations"
          />
          <FormControlLabel
            value="Maps"
            control={<Radio />}
            label="Maps Interactive"
          />
          <FormControlLabel
            value="Temporal Animations"
            control={<Radio />}
            label="Temporal Animations"
          />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: "20px" }}>
        <InputLabel id="statisticalTest-label">Statistical Test</InputLabel>
        <Select
          labelId="statisticalTest-label"
          id="statisticalTest"
          value={statisticalTest}
          label="Statistical Test"
          onChange={(e) => setStatisticalTest(e.target.value)}
        >
          {getStatisticalTestOptions().map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl component="fieldset" sx={{ marginBottom: "20px" }}>
        <FormLabel component="legend">
          {mapFormat === "Temporal Animations" ? "Video File" : "Year"}
        </FormLabel>
        <RadioGroup
          value={selectedYear}
          onChange={handleYearChange}
          row
        >
          {mapFormat === "Temporal Animations"
            ? getAnimationFiles().map((file) => (
                <FormControlLabel key={file} control={<Radio value={file} />} label={file} />
              ))
            : Array.from({ length: 9 }, (_, i) => {
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
