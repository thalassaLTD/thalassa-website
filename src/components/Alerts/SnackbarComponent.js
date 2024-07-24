import { Alert, Snackbar } from "@mui/material";
import React from "react";

const SnackbarComponent = ({
  snackbarOpen,
  snackbarMsg,
  severity,
  handleSnackbarClose,
}) => {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {snackbarMsg}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
