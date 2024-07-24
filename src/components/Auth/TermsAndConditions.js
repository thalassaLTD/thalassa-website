import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AmplitudeEvent from '../Amplitude/AmplitudeEvent'

const TermsAndConditions = () => {
  AmplitudeEvent("/terms-loaded");

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Terms and Conditions
      </Typography>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Privacy
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        We take your privacy very seriously. Any personal information you provide to us will be used only for the purposes stated in our privacy policy, which you can view <a href="/privacy-policy">here</a>.
      </Typography>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Data Security
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        We use industry-standard security measures to protect your data. However, no security system is completely foolproof, and we cannot guarantee the security of your data.
      </Typography>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Fair Use
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        We expect all users to use our services fairly and in accordance with our terms and conditions. We reserve the right to terminate the account of any user who violates our terms and conditions.
      </Typography>
    </Box>
  );
};

export default TermsAndConditions;
