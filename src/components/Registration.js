import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme } from "@mui/material/styles";
import { post2 } from "./Helper";
import SnackbarComponent from "./Alerts/SnackbarComponent";
import axios from 'axios';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Confirmation from "./Alerts/Confirmation";
import UploadFileComponent from "./Internship/UploadFileComponent";
import S3Bucket from "../aws-exports";
import FileThumbnail from "./commonComponents/FileThumbnail";

const baseURL = "https://api.joinuplyft.com";

const theme = createTheme();

const validationSchema = yup.object().shape({
  contact_number: yup.string().required("Contact number is required"),
  availability: yup.string().required("Availability is required"),
  onsite_availability: yup.string().required("Onsite Availability is required"),
  address: yup.string(),
  city: yup.string().required("City is required"),
  preferred_city: yup.string().required("Preferred City is required"),
  current_salary: yup.string().required("Current Salary is required"),
  expected_salary: yup.string().required("Expected Salary is required"),
  state: yup.string().required("State is required"),
  college: yup.string().required("College is required"),
  degree: yup.string().required("Degree is required"),
  passing_year: yup.number()
  .nullable()
  .min(1000, 'Year must be at least 1000')
  .max(9999, 'Year cannot be more than 9999')
  .test('is-year', 'Invalid year format', function (value) {
    const yearRegex = /^\d{4}$/; // Match 4 digits
    return value === null || yearRegex.test(value.toString());
  }),
  key_skills: yup.string().required("At least one key skill is required"),
  career_interest: yup.string().required("Career interest is required"),
});

export default function Registration({ studentDetails, onClose }) {
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [severity, setSeverity] = useState("success");
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [confirmResume, setConfirmResume] = useState(false);
  const [files, setFiles] = useState([]);
  const [filesForS3, setFilesForS3] = useState([]);
  const auth = getAuth();
  const navigate = useNavigate();
  console.log(studentDetails);
  const labels = {
    contact_number: "Contact Number",
    availability: "Availability",
    onsite_availability: "Onsite Availability",
    address: "Address",
    city: "City",
    preferred_city: "Preferred City",
    current_salary: "Current Salary",
    expected_salary: "Expected Salary",
    state: "State",
    college: "College",
    degree: "Degree",
    passing_year: "Passing Year",
    key_skills: "Key Skills",
    career_interest: "Career Interest",
  };
  const formik = useFormik({
    initialValues: {
      ...studentDetails,
      // key_skills: studentDetails.key_skills,
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: validationSchema,
  });

  const handleLogout = ()=>{
    setOpenConfirm(false);
    signOut(auth)
    .then(() => {
      navigate("/");
    })
    .catch((e) => {
      console.log(e);
    });
  }

  React.useEffect(() => {
    if(studentDetails.resume){
      const resumeFileName = studentDetails.resume.split("/").pop();
      setFiles([{ file_name: resumeFileName, file_path: studentDetails.resume }]);
    }
  }, [studentDetails.resume])
  
  const InputTextField = ({ name, label, id }) => {
    return (
      <Grid key={id} item xs={12} lg={6}>
        <TextField
          fullWidth
          name={name}
          label={label}
          value={formik.values[name]}
          onChange={formik.handleChange}
          error={formik.touched[name] && Boolean(formik.errors[name])}
          helperText={formik.touched[name] && formik.errors[name]}
        />
      </Grid>
    );
  };
  const InputSelect = ({ name, label, id, menuItems }) => {
    return (
      <Grid key={id} item xs={12} lg={6}>
        <FormControl
          // helperText={formik.touched[name] && formik.errors[name]}
          error={formik.touched[name] && Boolean(formik.errors[name])}
          fullWidth
        >
          <InputLabel id={id}>{label}</InputLabel>
          <Select
            name={name}
            label={label}
            value={formik.values[name]}
            onChange={formik.handleChange}
            labelId={id}
            id={id}
          >
            {menuItems?.length > 0 &&
              menuItems.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    );
  };

  const handleResumeUpload =  () => {
    S3Bucket.putObject(filesForS3[0])
      .on("httpUploadProgress", (evt) => {})
      .send((err, data) => {
        if (err) {
          console.log(err);
          setSnackbarMsg(err);
          setSeverity("error");
          setSnackbarOpen(true);
        } else {
          const reqData = {
            student_id: studentDetails.student_id,
            resume_s3_path: files[0].file_path,
          };
          setConfirmResume(false);
          axios.post(baseURL +"/addResume", reqData)
            .then((data) => {
              setSnackbarMsg("Resume uploaded successfully");
              setSeverity("success");
              setSnackbarOpen(true);
              setFiles([]);
              setFilesForS3([]);
              setTimeout(() => {
                onClose();
              }, 1000);
            })
            .catch((error) => {
              setSnackbarMsg("Some error occurred.");
              setSeverity("error");
              setSnackbarOpen(true);
            });
        }
      });
  };

  const handleSubmit = async (values) => {
    await axios.post(baseURL + "/updateProfile", values).then((data) => {
        setSnackbarMsg("Updates saved successfully.");
        setSeverity("success");
        setSnackbarOpen(true);
        if(!filesForS3.length>0){
          setFiles([]);
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      })
      .catch((error) => {
        setSnackbarMsg("Some error occurred in submission");
        setSeverity("error");
        setSnackbarOpen(true);
      });
      if(filesForS3.length>0){
      await handleResumeUpload()
     }
}

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMsg("");
    setSeverity("success");
  };

  return (
    <>
      {snackbarOpen && (
        <SnackbarComponent
          snackbarOpen={snackbarOpen}
          snackbarMsg={snackbarMsg}
          severity={severity}
          handleSnackbarClose={handleSnackbarClose}
        />
      )}
      {<Confirmation openConfirm={openConfirm} setOpenConfirm={setOpenConfirm} confirmAction={handleLogout} message={<Typography>Please fill in the details to proceed <br/> Or choose "YES" if you want to logout.</Typography>}/>}
      <Dialog
        open={true}
        fullScreen={fullScreen}
        sx={{ "& .MuiPaper-root": { minWidth: "60%", px: 3 } }}
      >
        <DialogTitle className="header" sx={{ fontWeight: 600 }}>
          Please fill in your details
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              {Object.entries(labels).map(([key, value], id) => {
                switch (key) {
                  case "onsite_availability":
                    return InputSelect({
                      id: key,
                      name: key,
                      label: value,
                      menuItems: ["yes", "no"],
                    });
                  case "availability":
                    return InputSelect({
                      id: key,
                      name: key,
                      label: value,
                      menuItems: ["Immediate", "1 Month","2 Months","3 Months"],
                    });
                  case "passing_year":
                    return InputSelect({
                      id: key,
                      name: key,
                      label: value,
                      menuItems:  Array.from({ length: 40 }, (_, i) => 2000 + i),
                    });
                  default:
                    return InputTextField({ id: key, name: key, label: value });
                }
              })}
            </Grid>
            <Grid container spacing={2}>
              <Grid item>
              <Typography
              my={2}
                variant="h6"
                textAlign="start"
                className="header"
                gutterBottom
              >
                Resume
              </Typography>
              
            {!studentDetails?.resume && <UploadFileComponent
                files={[...files]}
                setFiles={setFiles}
                filesForS3={filesForS3}
                setFilesForS3={setFilesForS3}
                setOpenConfirm={()=>{}}
                folder="resume/"
                path={`${studentDetails.student_id}`}
                S3folder="resume"
                // isDisabled={isDisabled}
                // setIsDisabled={setIsDisabled}
                // showUpload={showUpload}
                // setShowUpload={setShowUpload}
              />
              }
                          {studentDetails?.resume && <FileThumbnail
                file={files[0]}
                S3Download
              ></FileThumbnail>}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
          <Button color="primary" variant="outlined" 
            sx={{
              borderRadius: 20,
              mt:2,
              px:4,
              py:1
            }} onClick={()=>setOpenConfirm(true)}>
              Cancel
            </Button>
            <Button color="primary" variant="contained" type="submit"
            sx={{
              backgroundColor: "#123860",
              borderRadius: 20,
              mt:2,
              px:4,
              py:1
            }}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
