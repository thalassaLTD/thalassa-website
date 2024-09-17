import React from 'react';
import { Box, Tooltip, IconButton, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const TooltipHeader = ({ tooltipText, headerText, headerVariant = 'h2' }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Typography variant={headerVariant} style={{ marginRight: 8 }}>
                {headerText}
            </Typography>
            <Tooltip title={tooltipText} arrow>
                <IconButton size="small" sx={{ verticalAlign: 'middle', padding: 0 }}>
                    <InfoIcon style={{ marginBottom: 0 }} />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default TooltipHeader;
