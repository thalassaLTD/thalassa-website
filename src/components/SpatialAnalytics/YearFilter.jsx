import React from 'react';
import { FormControl, FormLabel, Checkbox, Box, FormControlLabel } from '@mui/material';

const YearFilter = ({ selectedYears, setSelectedYears }) => {
  const handleYearChange = (event) => {
    const { value } = event.target;
    setSelectedYears((prev) =>
      prev.includes(value) ? prev.filter((year) => year !== value) : [...prev, value]
    );
  };

  return (
    <FormControl component="fieldset" sx={{ marginBottom: '20px' }}>
      <FormLabel component="legend">Year</FormLabel>
      <Box>
        {Array.from({ length: 9 }, (_, i) => {
          const year = String(2014 + i);
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
  );
};

export default YearFilter;
