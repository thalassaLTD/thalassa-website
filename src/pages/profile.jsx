import { useState, useEffect } from "react";
import axios from "axios";

import {
  Avatar,
  Container,
  Paper,
  TextField,
  Typography,
  Grid,
  Button,
  Box,
  IconButton,
  Divider,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useTheme, createTheme } from "@mui/material/styles";
import { Edit, Save, Cancel } from "@mui/icons-material";
import Sidenav from "../components/NavBars/Sidenav";
import AmplitudeEvent from "../components/Amplitude/AmplitudeEvent";
import {
  getCurrentUser,
  getUserId,
  get,
  post,
  post2,
  Amplitude,
} from "../components/Helper";
import { createUseStyles } from "react-jss";
import bannerImage from "../assets/banner.jpg";
import SnackbarComponent from "../components/Alerts/SnackbarComponent";
import Confirmation from "../components/Alerts/Confirmation";
import UploadFileComponent from "../components/Internship/UploadFileComponent";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import S3Bucket, { S3Download } from "../aws-exports";
import FileThumbnail from "../components/commonComponents/FileThumbnail";
import { NumericFormatCustom } from "../components/commonComponents/NumericFormatCustom";
import ResponsiveAppBar from "../components/NavBars/ResNav";

const muiTheme = createTheme();
const useStyles = createUseStyles(() => ({
  overlayContainer: {
    position: "absolute",
    bottom: 0,
    transform: "translateY(80%)",
  },
  avatarOverlayContainer: {
    position: "absolute",
    bottom: 0,
    transform: "translateY(45%)",
  },
  bannerContainer: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },
  bannerImage: {
    objectFit: "cover",
    width: "100%",
  },
  btn: {
    backgroundColor: "#123860",
    borderRadius: 20,
    pl: 4,
    pr: 4,
    pt: 1,
    pb: 1,
  },
}));

const baseURL = "https://api.joinuplyft.com";

const StudentProfile = () => {
  const classes = useStyles();
  const [student, setStudent] = useState({});
  const [editable, setEditable] = useState(false);
  const currentUser = getCurrentUser();
  const photoUrl = currentUser.photoURL;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [severity, setSeverity] = useState("success");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmResume, setConfirmResume] = useState(false);
  const [files, setFiles] = useState([]);
  const [filesForS3, setFilesForS3] = useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [isDisabled, setIsDisabled] = useState(true);
  const [showUpload, setShowUpload] = useState(false);

  // const { acceptedFiles, getRootProps, getInputProps,isDragActive, isDragAccept } = useDropzone({ maxFiles: 1});

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  useEffect(() => {
    console.log(files);
  }, [files]);

  // useEffect(() => {
  //   if(acceptedFiles.length<2){
  //       handleSingleFileUpload(acceptedFiles);
  //   }
  // }, [acceptedFiles]);
  const fetchStudentDetails = () => {
    const reqData = { googleuid: currentUser.uid };
    post("/getStudent", reqData)
      .then((data) => {
        if (data.resume) {
          const resumeFileName = data.resume.split("/").pop();
          setFiles([{ file_name: resumeFileName, file_path: data.resume }]);
        }
        console.log("data::", data);
        setStudent(data);
      })
      .catch((error) => {
        console.error(error);
        setSnackbarMsg("Some error occurred.");
        setSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const saveForS3 = (file) => {
    setFilesForS3(file);
  };

  const handleSave = async () => {
    const reqData = student;
    setOpenConfirm(false);
    axios
      .post(baseURL + "/updateProfile", reqData)
      .then((data) => {
        setSnackbarMsg("Updates saved successfully.");
        setSeverity("success");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        setSnackbarMsg("Some error occurred.");
        setSeverity("error");
        setSnackbarOpen(true);
      });
    setEditable(false);
  };

  const handleResumeUpload = () => {
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
            student_id: currentUser.uid,
            resume_s3_path: files[0].file_path,
          };
          setConfirmResume(false);
          post2("/addResume", reqData)
            .then((data) => {
              setSnackbarMsg("Resume uploaded successfully");
              setSeverity("success");
              setSnackbarOpen(true);
              setShowUpload(false);
              setFiles([]);
              setFilesForS3([]);
              setTimeout(() => {
                fetchStudentDetails();
              }, 2500);
            })
            .catch((error) => {
              setSnackbarMsg("Some error occurred.");
              setSeverity("error");
              setSnackbarOpen(true);
            });
        }
      });
  };

  const handleCancel = () => {
    setEditable(false);
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleChange = (event) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMsg("");
    setSeverity("success");
  };

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
      // Form is valid, submit the form
      setOpenConfirm(true);
    } else {
      // Form is invalid, display error messages or take other actions
    }
  }

  const FormComponent = () => {
    return (
      <form onSubmit={handleSubmit}>
        <Grid container p={2} spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="College"
              name="college"
              value={student?.college || ""}
              onChange={handleChange}
              disabled={!editable}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="number"
              required
              fullWidth
              label="Contact Number"
              name="contact_number"
              value={student?.contact_number || ""}
              onChange={handleChange}
              disabled={!editable}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="Degree"
              name="degree"
              value={student?.degree || ""}
              onChange={handleChange}
              disabled={!editable}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="Career Interest"
              name="career_interest"
              value={student?.career_interest || ""}
              onChange={handleChange}
              disabled={!editable}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="availability">Availability</InputLabel>
              <Select
                id="availability"
                label="Availability(Eg: Immediately)"
                name="availability"
                value={student?.availability || ""}
                fullWidth
                onChange={handleChange}
                disabled={!editable}
                defaultValue={"Immediate"}
              >
                {["Immediate", "1 Month", "2 Months", "3 Months"].map(
                  (item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="passing_year">Passing Year</InputLabel>
              <Select
                id="passing_year"
                defaultValue={"no"}
                required
                fullWidth
                label="Passing Year"
                name="passing_year"
                value={student?.passing_year || ""}
                onChange={handleChange}
                disabled={!editable}
              >
                {Array.from({ length: 40 }, (_, i) => 2000 + i).map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={student?.address || ""}
              onChange={handleChange}
              disabled={!editable}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="State"
              name="state"
              value={student?.state || ""}
              onChange={handleChange}
              disabled={!editable}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="Current City"
              name="city"
              value={student?.city || ""}
              onChange={handleChange}
              disabled={!editable}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="Preferred City"
              name="preferred_city"
              value={student?.preferred_city || ""}
              onChange={handleChange}
              disabled={!editable}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
            type="number"
              required
              fullWidth
              label="Pin Code"
              name="pin_code"
              value={student?.pin_code || ""}
              onChange={handleChange}
              disabled={!editable}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              disabled={!editable}
              label="Current Salary"
              name="current_salary"
              value={student?.current_salary || ""}
              onChange={handleChange}
              InputProps={{
                inputComponent: NumericFormatCustom,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              disabled={!editable}
              required
              fullWidth
              label="Expected Salary"
              name="expected_salary"
              value={student?.expected_salary || ""}
              onChange={handleChange}
              InputProps={{
                inputComponent: NumericFormatCustom,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="onsite_availability">
                Onsite availability
              </InputLabel>
              <Select
                labelId="onsite_availability"
                id="onsite_availability"
                name="onsite_availability"
                value={student?.onsite_availability || ""}
                label="Onsite availability"
                onChange={handleChange}
                disabled={!editable}
                defaultValue={"no"}
              >
                <MenuItem value={"yes"}>Yes</MenuItem>
                <MenuItem value={"no"}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="Key Skills"
              name="key_skills"
              value={student?.key_skills || ""}
              onChange={handleChange}
              disabled={!editable}
            />
          </Grid>
          <Grid item xs={12}>
            <Box>
              {editable ? (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    className={classes.btn}
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                  >
                    Save
                  </Button>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    startIcon={<Cancel />}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Button
                  className={classes.btn}
                  variant="contained"
                  onClick={handleEdit}
                >
                  <Edit /> Edit profile
                </Button>
                // <Button variant="contained" onClick={handleEdit} color="primary" sx={{ width: '100%' }}>
                //     Edit Profile
                // </Button>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              my={2}
              variant="h6"
              textAlign="start"
              className="header"
              gutterBottom
            >
              Resume
            </Typography>
            {(!student?.resume || showUpload) && (
              <UploadFileComponent
                files={[...files]}
                setFiles={setFiles}
                filesForS3={filesForS3}
                setFilesForS3={saveForS3}
                setOpenConfirm={setConfirmResume}
                folder="resume/"
                path={`${currentUser.uid}`}
                S3folder="resume"
                isDisabled={isDisabled}
                setIsDisabled={setIsDisabled}
                showUpload={showUpload}
                setShowUpload={setShowUpload}
                showSubmitButton
              />
            )}
            {student?.resume && !showUpload && files.length > 0 && (
              <Grid item container xs={12} md={6}>
                <FileThumbnail
                  file={files[0]}
                  S3Download={() =>
                    S3Download(student.resume, student.resume.split("/").pop())
                  }
                  isDownloadable
                >
                  <Grid item xs={12}>
                    <div>or</div>
                    <div>
                      <Button
                        endIcon={<BackupOutlinedIcon fontSize="small" />}
                        sx={{
                          pl: 0,
                          textTransform: "none",
                        }}
                        onClick={() => setShowUpload(true)}
                      >
                        Upload Resume
                      </Button>
                    </div>
                  </Grid>
                </FileThumbnail>
              </Grid>
            )}
          </Grid>
        </Grid>
      </form>
    );
  };

  const MobileView = () => {
    return (
      <>
        <Paper className={classes.bannerContainer} sx={{ height: "20vh" }}>
          <img
            src={bannerImage}
            className={classes.bannerImage}
            alt="fireSpot"
          />
          <Box className={classes.avatarOverlayContainer}>
            <Avatar src={photoUrl} sx={{ width: 120, height: 120 }} />
          </Box>
        </Paper>
        <Grid container direction="column" alignItems="center" sx={{ mt: 4 }}>
          <Grid item sx={{ textAlign: "center" }}>
            <Typography variant="h6" className="header" sx={{ mt: 2 }}>
              {getCurrentUser()?.displayName}
            </Typography>
            <Typography
              variant="subtitle1"
              color="#9e9ea7"
              sx={{ mt: 1, mb: 2 }}
            >
              {getCurrentUser()?.email}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          component={Paper}
          mt={1}
          direction="column"
          alignItems="center"
          spacing={2}
          p={2}
        >
          <Typography textAlign="start" className="header" variant="h6">
            Account Details
          </Typography>
          {FormComponent()}
        </Grid>
      </>
    );
  };

  const DesktopView = () => {
    return (
      <Paper>
        <Paper className={classes.bannerContainer} sx={{ height: "35vh" }}>
          <img
            src={bannerImage}
            className={classes.bannerImage}
            alt="fireSpot"
          />
          <Box className={classes.overlayContainer}>
            <Grid
              container
              sx={{ p: 8 }}
              spacing={2}
              justifyContent="space-between"
            >
              <Grid style={{ paddingTop: 0 }} px={2} item container md={3}>
                <Paper
                  sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                    [muiTheme.breakpoints.down("md")]: {
                      background: "transparent",
                      boxShadow: "none",
                    },
                  }}
                >
                  <Avatar src={photoUrl} sx={{ width: 150, height: 150 }} />
                  <Typography variant="h6" className="header" sx={{ mt: 2 }}>
                    {getCurrentUser()?.displayName}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="#9e9ea7"
                    sx={{ mt: 1, mb: 2 }}
                  >
                    {getCurrentUser()?.email}
                  </Typography>
                  <Divider
                    orientation="horizontal"
                    sx={{ mb: "1rem", width: "100%" }}
                  />
                  <Grid container item pb={2} justifyContent="space-around">
                    <Grid item>
                      {" "}
                      <Typography variant="body1">
                      Programs enrolled
                      </Typography>{" "}
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" fontWeight={600}>
                        {" "}
                        {student?.enrolled_internships?.length
                          ? student.enrolled_internships.length
                          : 0}
                      </Typography>{" "}
                    </Grid>
                  </Grid>
                  <Divider
                    orientation="horizontal"
                    sx={{ mb: "1rem", width: "100%" }}
                  />
                </Paper>
              </Grid>
              <Grid
                sx={{ px: 8 }}
                item
                md={9}
                container
                spacing={2}
                justifyContent="center"
              >
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography pl={2} className="header" variant="h6">
                    Account Details
                  </Typography>
                  {FormComponent()}
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Paper>
    );
  };

  return (
    <>
     <ResponsiveAppBar/>
    
    <Box sx={{ display: "flex", height: "100%" }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, height: "100%" }}>
        {openConfirm && (
          <Confirmation
            openConfirm={openConfirm}
            setOpenConfirm={setOpenConfirm}
            confirmAction={handleSave}
            message={"Are you sure you want to submit?"}
          />
        )}
        {confirmResume && (
          <Confirmation
            openConfirm={confirmResume}
            setOpenConfirm={setConfirmResume}
            confirmAction={handleResumeUpload}
            message={"Are you sure you want to submit?"}
          />
        )}
        {snackbarOpen && (
          <SnackbarComponent
            snackbarOpen={snackbarOpen}
            snackbarMsg={snackbarMsg}
            severity={severity}
            handleSnackbarClose={handleSnackbarClose}
          />
        )}
        {matches ? DesktopView() : MobileView()}
      </Box>
    </Box>
    </>
  );
};

export default StudentProfile;
