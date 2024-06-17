import * as React from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

function SimpleDialog(props) {
  const { open, onClose } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "LOG_OUT" });
    navigate("/login");
  };
  return (
    <Dialog onClose={onClose} fullWidth={true} maxWidth="xs" open={open}>
      <DialogTitle>Please, confirm to logout</DialogTitle>
      <Box
        sx={{
          display: "flex",
          alignItems: "felx-end",
          justifyContent: "center",
          m: 2,
        }}
      >
        <Button
          sx={{ mr: 2 }}
          color="primary"
          variant="outlined"
          onClick={onClose}
        >
          cancel
        </Button>
        <Button color="primary" variant="contained" onClick={handleLogout}>
          confirm
        </Button>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {
  const { open, onClose } = props;
  return (
    <div>
      <SimpleDialog open={open} onClose={onClose} />
    </div>
  );
}
