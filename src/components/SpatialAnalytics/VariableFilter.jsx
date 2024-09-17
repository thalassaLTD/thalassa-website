import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const VariableFilter = ({ independentVariable, setIndependentVariable, dependentVariable, setDependentVariable }) => (
  <>
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
  </>
);

export default VariableFilter;
