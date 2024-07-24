import React, { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import {
  Description as DescriptionIcon,
  PictureAsPdf as PdfIcon,
  InsertDriveFile as FileIcon,
  InsertChartOutlined as ExcelIcon,
} from "@mui/icons-material/";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import AWS from "aws-sdk";
import Quiz from "./Quiz/Quiz";
import VideoRecording from "./VideoRecording";
import InterviewInstructions from "./InterviewInstructions";
import Upload from "./Upload";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from "axios";
import CustomContainer from "../commonComponents/CustomContainer.js";
import { AuthContext } from "../../components/Auth/Auth";
import { Box, Card, Divider, Grid, Stack } from "@mui/material";
import Link from "@mui/material/Link";
import FileThumbnail from "../commonComponents/FileThumbnail";

const S3_BUCKET = "react-uploads-uplyft";
const REGION = "us-east-1";

const baseURL = "https://api.joinuplyft.com";

export default function Task({
  taskData,
  internshipId,
  projectId,
  interviewQuestions,
  taskTrackingData,
  fetchStudentTracking,
  studentTaskData,
}) {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [buttonId, setButtonId] = useState(null);

  AWS.config.update({
    accessKeyId: "AKIAU77UJPOWFJYTFRP3",
    secretAccessKey: "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",
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const s3 = new AWS.S3({
    params: {
      Bucket: "react-uploads-uplyft",
    },
  });

  const S3Download = (file, id) => {
    setLoading(true);
    setButtonId(id);
    if (file.file_path.charAt(0) === "/") {
      file.file_path = file.file_path.substring(1);
    }
    return new Promise((resolve, reject) => {
      s3.getObject({ Key: `${file.file_path}` }, (err, data) => {
        if (err) {
          setLoading(false);
          reject(err);
        } else {
          const url = URL.createObjectURL(new Blob([data.Body]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", file.file_name);
          document.body.appendChild(link);
          link.click();
          setLoading(false);
          resolve();
        }
      });
    });
  };

  const getfileLink = (S3Link) => {
    if (S3Link) {
      S3Link = S3Link.substring(1, S3Link.length);
      console.log("s3 download", S3Link);
      let ret = "";
      s3.getObject({ Key: `${S3Link}` }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const url = URL.createObjectURL(
            new Blob([data.Body], { type: "video/webm" })
          );
          const videoEl = document.getElementById("interview_playback");
          videoEl.src = url;
        }
      });
    }
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return <PdfIcon />;
      case "doc":
      case "docx":
        return <DescriptionIcon />;
      case "xls":
      case "xlsx":
        return <ExcelIcon />;
      default:
        return <FileIcon />;
    }
  };

  if (taskData.task_title === "Quiz") {
    return (
      <Quiz
        projectId={projectId}
        fetchStudentTracking={fetchStudentTracking}
        studentTaskData={studentTaskData}
      />
    );
  }
  if (taskData.task_title === "Video Interview") {
    return (
      <>
        {!taskTrackingData.interview_video && interviewQuestions && (
          <InterviewInstructions interviewQuestions={interviewQuestions} />
        )}
        <VideoRecording
          taskTrackingData={taskTrackingData}
          projectId={projectId}
          interviewQuestions={interviewQuestions}
          fetchStudentTracking={fetchStudentTracking}
          getfileLink={getfileLink}
        />
      </>
    );
  } else {
    return (
      <Box>
        <Typography
          gutterBottom
          className="header"
          variant="h5"
          sx={{ mt: 2, mb: 2, width: "fit-content" }}
        >
          Task Background
        </Typography>
        <Divider orientation="horizontal" />
        {taskData?.task_info_paragraphs.map((para, i) => (
          <Typography key={i} className="body" variant="body1">
            {para}
          </Typography>
        ))}
        <Typography className="body" variant="body1">
          {taskData.task_background}
        </Typography>

        {taskData?.task_video && (
          <CardMedia
            component="iframe"
            width="420"
            height="415"
            src={taskData.task_video}
            sx={{ mt: 2, mb: 2, width: "60%" }}
          />
        )}

        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12}>
            {/* <Paper sx={{ borderRadius: 3, p: 3, mb: 3 }}> */}
            <Typography gutterBottom className="header" variant="h5">
              Your Task
            </Typography>
            <Divider orientation="horizontal" />
            {taskData?.task_instructions.map((para, id) => (
              <Typography key={id} className="body" variant="body1">
                {para}
              </Typography>
            ))}
            <Typography variant="p">{taskData.your_task}</Typography>
            {/* </Paper> */}
            {/* <Paper sx={{ borderRadius: 3, p: 3 }}> */}
          </Grid>         
          <Grid item xs={12}>
            {/* <Paper sx={{ borderRadius: 3, p: 3 }}> */}
            {taskData?.task_files?.length > 0 && (
              <>
                <Typography className="header" variant="h5">
                  Resource Files
                </Typography>
                <Divider orientation="horizontal" />
                <Typography className="body" variant="body1" mb={2}>
                  Resource files to guide you in completing the task
                </Typography>
                <Grid container spacing={2}>
                  {taskData?.task_files.map((file, id) => {
                    return (
                      <Grid item key={id}>
                        <FileThumbnail
                          file={file}
                          id={id}
                          buttonId={buttonId}
                          loading={loading}
                          S3Download={S3Download}
                          isDownloadable
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            )}
            {taskData?.task_links?.length > 0 && (
              <>
                <Typography gutterBottom className="header" variant="h5">
                  Resource Links
                </Typography>
                <Divider orientation="horizontal" />
                <Typography className="body" variant="body1">
                  Resource links to guide you in completing the task
                </Typography>
                <CustomContainer>
                  {taskData?.task_links?.map((file, id) => {
                    return (
                      file && (
                        <Stack key={id} spacing={2} direction="row">
                          <ChevronRightIcon sx={{ color: "#1976d2" }} />
                          <Link
                            href={file}
                            target="_blank"
                            underline="none"
                            variant="body1"
                            style={{ lineBreak: "anywhere" }}
                          >
                            {file}
                          </Link>
                        </Stack>
                      )
                    );
                  })}
                </CustomContainer>
              </>
            )}
            {/* </Paper> */}
          </Grid>
          <Grid item xs={12}>
            {(!taskTrackingData?.tasks_done ||
              taskTrackingData?.tasks_done?.length === 0 ||
              taskTrackingData?.tasks_done?.every(
                (done) => Number(done.task_id) !== taskData?.task_number
              )) && (
              <>
                <Typography gutterBottom className="header" variant="h5">
                  Submit your work
                </Typography>
                <Divider orientation="horizontal" />
                <Upload
                  id={taskData?.task_number}
                  fetchStudentTracking={fetchStudentTracking}
                  projectId={projectId}
                />
              </>
            )}
          </Grid>
          <Grid item container xs={12} direction="column">
            {taskTrackingData?.tasks_done?.length > 0 && (
              <Grid item>
                <Typography gutterBottom className="header" variant="h5">
                  Your Submitted Files
                </Typography>
                <Divider orientation="horizontal" sx={{ mb: "1rem" }} />
              </Grid>
            )}
            {taskTrackingData?.tasks_done?.map((done, id) => (
              <div key={id}>
                {Number(done.task_id) === taskData?.task_number && (
                  <>
                    <Grid item xs={6} md={4} lg={4} xl={2}>
                      <FileThumbnail
                        customPadding={{ px: 3, py: 6 }}
                        file={{
                          file_name: done.task_filename,
                          file_path: done.task_file_submit[0],
                        }}
                        id={`upload_file_${id}`}
                        buttonId={buttonId}
                        loading={loading}
                        S3Download={(file, id) =>
                          S3Download(file, id)
                            .then(() => {
                              setTimeout(() => {
                                fetchStudentTracking();
                              }, 1500);
                            })
                            .catch((error) => {
                              console.log("Error", error);
                            })
                        }
                        isDownloadable
                      />
                    </Grid>
                  </>
                )}
              </div>
            ))}
          </Grid>
        </Grid>
      </Box>
    );
  }
}
