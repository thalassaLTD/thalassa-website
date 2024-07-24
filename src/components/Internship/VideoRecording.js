import React, { useState, useEffect } from "react";
import { useRecordWebcam } from "react-record-webcam";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  Button,
  CircularProgress,
  Backdrop,
  IconButton,
  Tooltip,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  Typography,
  Stack
} from "@mui/material";
import AWS from "aws-sdk";
import { createUseStyles } from "react-jss";
// import Upload from "./Upload";
import { getCurrentUser, getUserId, get, post, Amplitude } from "../Helper";
import { MdOutlineClose, MdPermCameraMic } from "react-icons/md";
import Countdown from "react-countdown";
import Confirmation from "../Alerts/Confirmation";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SnackbarComponent from "../Alerts/SnackbarComponent";
import { BorderLinearProgress } from "../commonComponents/ProgressBar";
import CircularProgressWithLabelled from "../commonComponents/CircularProgressLabelled";

AWS.config.update({
  accessKeyId: "AKIAU77UJPOWFJYTFRP3",
  secretAccessKey: "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",
});

const myBucket = new AWS.S3({
  params: { Bucket: "react-uploads-uplyft" },
  region: "us-east-1",
});

const s3 = new AWS.S3({
  region: "us-east-1",
  accessKeyId: "your-access-key-id",
  secretAccessKey: "your-secret-access-key",
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const VideoContainer = styled(Paper)(({ theme, isRecording }) => ({
  padding: isRecording ? 0 : theme.spacing(1),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f5f5f5",
  border: isRecording ? "7px solid lightgreen" : "2px solid #ccc",
  borderRadius: "5px",
  position: "relative",
  "&.recording:before": {
    content: '""',
    position: "absolute",
    top: "5px",
    left: "5px",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "red",
    animation: "recording 1s infinite",
  },
  "@keyframes recording": {
    "0%": { opacity: 1 },
    "50%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
  "&:not(:hover)": {
    "& .MuiBackdrop-root": {
      visibility: "hidden",
    },
  },
  "& .MuiBackdrop-root": {
    visibility: isRecording ? "hidden" : "visible",
  },
}));

const Video = styled("video")({
  width: "100%",
  height: "auto",
});

const useStyles = createUseStyles({
  videoOverlay: {
    width: "100%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.4)",
  },
  buttonContainer: {
    position: "absolute",
  },
  textContainer: {
    border: '1px solid rgba(17,53,90,.2)',
    borderRadius:'.5rem',
    padding:'1rem',
    height:'85%',
    "& .text-section": {
      overflowY: "scroll",
      height: "85%",
      "&::-webkit-scrollbar": {
        width: 5,
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#f1f1f1",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#c1c1c1",
        borderRadius: 8,
      },
    },
    "& .bottom-bar.MuiBox-root": {
      paddingBottom: "20px",
      // background: "#123860",
     
    },

  },
});

export default function VideoRecording({
  projectId,
  interviewQuestions,
  fetchStudentTracking,
  taskTrackingData,
  getfileLink
}) {
  const classes = useStyles();
  const [videoPath, setVideoPath] = useState(null);
  const [recordingStopped, setRecordingStopped] = useState(false);
  const [preview, setPreview] = useState(false);
  const [recording, setRecording] = useState(false);
  const recordWebcam = useRecordWebcam({ frameRate: 15 });
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [timeLeft, setTimeLeft] = useState(0); //time in milliseconds
  const [qNumber, setQNumber] = useState(1);  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [severity, setSeverity] = useState("success");
  const [progress, setProgress] = useState(null)
  // const uid = getUserId();

  useEffect(() => {
    if (taskTrackingData) {
      setVideoPath(taskTrackingData.interview_video);
      getfileLink(taskTrackingData.interview_video)
    }
  }, [taskTrackingData]);

  useEffect(() => {
    if (
      recordWebcam.status === "OPEN" &&
      recording === true &&
      recordWebcam.status !== "INIT"
    ) {
      recordWebcam.start();
    }
    if (recording && recordWebcam.status === "RECORDING") {
      setTimeLeft(Date.now() + 120000);

    }
  }, [recordWebcam.status, recording]);

  const resetStates = () => {
    setPreview(false);
    setRecording(false);
    setRecordingStopped(true);
    recordWebcam.close();
  };

  const handleSnackbarClose = (event, reason) => {
    setSnackbarOpen(false);
    setSnackbarMsg("");
    setSeverity("success");
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[2]);

    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const downloadVideo = (blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interview.mp4'; // Set the desired file name with the appropriate extension
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const saveFile = async () => {
    try {
      setOpenConfirm(false);
      console.log("File upload starting:");
      const blob = await recordWebcam.getRecording();
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = async () => {
        const base64data = reader.result;
        downloadVideo(blob)
        const file = dataURLtoFile(base64data, "interview.webm");

        const params = {
          Bucket: "react-uploads-uplyft",
          Key:
            "video_interviews/" + `${getUserId()}/${projectId}/` + file.name,
          Body: file,
          ContentType: file.type,
          ACL: "public-read",
        };
       await myBucket
          .putObject(params)
          .on("httpUploadProgress", (progressVal) => {
            let progressPercentage = Math.round(progressVal.loaded / progressVal.total * 100);
            setProgress(progressPercentage)
            console.log(progressPercentage);
            console.log("File uploaded 5:");
          }).promise().then(()=>{
            setProgress(null)
            postVideo()
          })
          .catch(err => {
            setProgress(null)
            console.log('Error uploading object:', err);
            setSnackbarMsg('Some error occurred')
            setSeverity('error')
            setSnackbarOpen(true)
          });
      };
    } catch (error) {
      setProgress(null)
      console.error(error);
      setSnackbarMsg('Some error occurred')
      setSeverity('error')
      setSnackbarOpen(true)
    }
  };

const postVideo=()=>{
  const reqData = {
    project_id: projectId,
    student_id: getUserId(),
    // internship_id: internshipId,
    video_path:
      `/video_interviews/${getUserId()}/${projectId}/` + "interview.webm",
  };

  post("/addInterviewVideo", reqData)
    .then((data) => {
      setSnackbarMsg('Video uploaded successfully')
      setSeverity('success')
      setSnackbarOpen(true)
      fetchStudentTracking();
      resetStates();
    })
    .catch((error) => console.error(error));
}

  const handleNext=()=>{
     
    if (qNumber < interviewQuestions.length) {
      //set next question
      setTimeLeft(Date.now() + 120000);
      setQNumber((prev) => prev + 1);
    } else {
      recordWebcam.stop();
      recordWebcam.close();
      setRecordingStopped(true);
      setRecording(false);
    }
  }
  const QuestionSection = () => {
    return (
      <Paper elevation={0} className={classes.textContainer}>
        {
          // before recording
          !recordingStopped && !recording && (
            <Grid
              container
              className="text-section"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h6">
                You can test your camera by clicking the icon{" "}
                <IconButton
                  disabled
                  sx={{
                    color: "#fff",
                    zIndex: 4,
                    background: "#123860",
                  }}
                >
                  <MdPermCameraMic fontSize={40}/>
                </IconButton>
              </Typography>
            </Grid>
          )
        }
        {
          // To dynamically render questions
          recording && recordWebcam.status === "RECORDING" && (
            <Countdown
              date={timeLeft}
              renderer={({ minutes, seconds, completed }) => {
                return (
                  <Grid  direction='column' alignItems='center' justifyContent='space-between'>

                    <Grid item width='95%' pb={2}>
                    <Box sx={{display:'flex',alignItems: "center",justifyContent:'space-between'}}>
                      <Typography variant="subtitle-1">Question {qNumber} of {interviewQuestions.length}</Typography>
                      <Typography variant="subtitle-1" style={{ marginLeft: "auto", marginRight: "12px" }}>
                        Remaining time: {minutes}:{seconds}
                      </Typography>
                      </Box>
                      <BorderLinearProgress variant="determinate" value={(qNumber)*100/interviewQuestions.length} /> 
                    </Grid>
                    <Grid item className="text-section">
                      <p>{interviewQuestions[qNumber - 1]}</p>
                    </Grid>
                    <Grid item className="bottom-bar">
                      <Button 
                      sx={{ backgroundColor: "#123860",
                      borderRadius: 20,
                      pl: 4,
                      pr: 4,
                      pt: 1,
                      pb: 1
                    }}
                      onClick={handleNext} variant="contained">
                          Go to Next 
                      </Button>
                    </Grid>
                  </Grid>
                );
              }}
              onComplete={handleNext}
            />
          )
        }
        {
          // To show recording completed
          recordingStopped && !recording && (
            <Grid
              container
              className="text-section"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <h5>You have completed the interview. Please submit.</h5>
            </Grid>
          )
        }
      </Paper>
    );
  };

  if (videoPath) {
    return (
      <>

      <Box sx={{width:'50%'}}>
        <h3>Interview already submitted</h3>
        <VideoContainer >
          <Video
            id="interview_playback"
            ref={recordWebcam.previewRef}
            muted
            controls
            type="video/webm"
          >
            </Video>
        </VideoContainer>
        </Box>
        </>

    );
  } else 
  {
    return (
      <>
         {progress && <CircularProgressWithLabelled value={progress}/>}

        <Confirmation openConfirm={openConfirm} setOpenConfirm={setOpenConfirm} confirmAction={saveFile} message={'Are you sure you want to submit your interview?'}/>
        {snackbarOpen && (
        <SnackbarComponent
          snackbarOpen={snackbarOpen}
          snackbarMsg={snackbarMsg}
          severity={severity}
          handleSnackbarClose={handleSnackbarClose}
        />
      )}
        <Box>
          <Grid
            container
            spacing={1}
            sx={{ marginTop: "24px" }}
          >
            <Grid item md={5} xs={12}>
              <QuestionSection />
            </Grid>
            <Grid item container justifyContent="center" md={1} xs={12}>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item md={5} xs={12}>
              <VideoContainer isRecording={recordWebcam.status === "RECORDING"}>
                {
                  // loading while init
                  recordWebcam.status === "INIT" && (
                    <Backdrop
                      sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                      }}
                      open={true}
                      style={{ position: "absolute" }}
                    >
                      <CircularProgress color="inherit" />
                    </Backdrop>
                  )
                }
                {
                  // To show the video once recording is stopped
                  recordingStopped && !recording ? (
                    <Video
                      id="videoPlay"
                      ref={recordWebcam.previewRef}
                      autoPlay
                      muted
                      controls
                    />
                  ) : (
                    // Initial view To show button which lets user to preview
                    !preview &&
                    !recording && (
                      <div className={classes.videoOverlay}>
                        <div className={classes.buttonContainer}>
                          <IconButton
                            size="large"
                            sx={{
                              color: "#fff",
                              zIndex: 4,
                            }}
                            onClick={() => {
                              recordWebcam.open();
                              setPreview(true);
                            }}
                            disabled={recordWebcam.status !== "CLOSED"}
                          >
                            <MdPermCameraMic fontSize={40}/>
                          </IconButton>
                        </div>
                        <Video />
                      </div>
                    )
                  )
                }
                {
                  // To close preview mode
                  preview && !recording && !recordingStopped && (
                    <>
                      <Backdrop open={true} style={{ position: "absolute" }}>
                        <Tooltip title="close preview">
                          <IconButton
                            onClick={() => {
                              recordWebcam.close();
                              setPreview(false);
                            }}
                            sx={{
                              color: "#fff",
                              zIndex: 4,
                            }}
                            aria-label="close"
                          >
                            <MdOutlineClose />
                          </IconButton>
                        </Tooltip>
                      </Backdrop>
                      <Video
                        id="before"
                        ref={recordWebcam.webcamRef}
                        autoPlay
                        muted
                      />
                    </>
                  )
                }
                {recording && (
                  <Video
                    id="recording"
                    ref={recordWebcam.webcamRef}
                    autoPlay
                    muted
                  />
                )}
              </VideoContainer>
              <Grid
                container
                justifyContent={"center"}
                sx={{ marginTop: "24px" }}
              >
                <Grid item>
                  {!recording && !recordingStopped && (
                    <Button
                      sx={{
                        borderRadius: 8,
                        backgroundColor: "rgb(18, 56, 96)",
                      }}
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        recordWebcam.open();
                        setRecording(true);
                      }}
                    >
                      Start Interview
                    </Button>
                  )}
                  {recording && (
                    <Button
                      sx={{
                        borderRadius: 8,
                      }}
                      variant="contained"
                      color="error"
                      onClick={() => {
                        recordWebcam.stop();
                        recordWebcam.close();
                        setRecordingStopped(true);
                        setRecording(false);
                      }}
                      disabled={recordWebcam.status !== "RECORDING"}
                    >
                      Stop recording
                    </Button>
                  )}
                  {recordingStopped && (
                    <Button
                      sx={{
                        borderRadius: 8,
                        backgroundColor: "rgb(18, 56, 96)",
                      }}
                      variant="contained"
                      onClick={
                        // saveFile
                        () => {
                          setOpenConfirm(true);
                        }
                      }
                      disabled={!recordingStopped}
                    >
                      Submit
                    </Button>
                  )}
                </Grid>
                {/* <Grid item>
                <Button
                  variant="contained"
                  onClick={
                    // saveFile
                    () => setOpenConfirm(true)}
                  disabled={!recordingStopped}
                >
                  Submit interview
                </Button>
              </Grid> */}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}
