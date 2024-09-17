import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const StatisticalTestFilter = ({ statisticalTest, setStatisticalTest }) => (
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
);

export default StatisticalTestFilter;

