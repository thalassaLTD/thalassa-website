import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DescriptionIcon from "@mui/icons-material/Description";
import axios from "axios";
import { getCurrentUser, get, post } from "../../components/Helper";
import { createUseStyles } from "react-jss";
import { useParams } from "react-router-dom";
import AWS from "aws-sdk";
import { AuthContext } from "../../components/Auth/Auth";
import { Chip, IconButton, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DeleteOutline } from "@mui/icons-material";
import Confirmation from "../Alerts/Confirmation";
import SnackbarComponent from "../Alerts/SnackbarComponent";
import UploadFileComponent from "./UploadFileComponent";
import S3Bucket from "../../aws-exports";

const S3_BUCKET = "react-uploads-uplyft";
const REGION = "us-east-1";

AWS.config.update({
  accessKeyId: "AKIAU77UJPOWFJYTFRP3",
  secretAccessKey: "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",
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const baseURL = "https://api.joinuplyft.com";

const useStyles = createUseStyles((theme) => ({
  thumbnail: {
    maxWidth: 256,
    maxHeight: "auto",
  },
}));

export default function Upload(props) {
  const classes = useStyles();
  const [id, setId] = useState();
  const [progress, setProgress] = useState(0);
  const { currentUser } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [files, setFiles] = useState([]);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [severity, setSeverity] = useState("success");
  const [filesForS3, setFilesForS3] = useState([]);

  useEffect(() => {
    setId(props.id);
  }, [props.id]);

  const handleChange = (event) => {
    setFiles(event.target.files[0]);
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
      setThumbnail(reader.result);
    };
  };

  const handleSnackbarClose = (event, reason) => {
    setSnackbarOpen(false);
    setSnackbarMsg("");
    setSeverity("success");
  };
  const uploadFilesToS3 = () => {
    filesForS3.map((file) => {
      S3Bucket.putObject(file)
        .on("httpUploadProgress", (evt) => {})
        .send((err) => {
          if (err) {
            console.log(err);
            setSnackbarMsg(err);
            setSeverity("error");
            setSnackbarOpen(true);
          }
        });
    });
  };

  const uploadFile = () => {
    setOpenConfirm(false)
    uploadFilesToS3();
    files.map((file) => {
      const reqData = {
        student_id: currentUser.uid,
        project_id: props.projectId,
        task_id: id,
        task_filename: file.file_name,
        task_number: id,
        task_file_submit: file.file_path,
      };
      post("/addTaskDone", reqData)
        .then((data) => {
          props.fetchStudentTracking();
          setSnackbarMsg("File uploaded successfully");
          setSeverity("success");
          setSnackbarOpen(true);
        })
        .catch((error) => {
          setSnackbarMsg("Some error occurred.");
          setSeverity("error");
          setSnackbarOpen(true);
          console.error(error);
        });
    });
  };

  //   const renderThumbnail = () => {
  //     return (
  //       file.name && (
  //         <Chip
  //           label={file.name}
  //           onDelete={() => setFiles(null)}
  //           deleteIcon={<DeleteOutline style={{ color: "#555" }} />}
  //         ></Chip>
  //       )
  //     );
  //   };

  return (
    <Grid container item sx={{ mt: "1rem" }}>
      <Confirmation
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        confirmAction={uploadFile}
        message={"Are you sure you want to submit?"}
      />
      {snackbarOpen && (
        <SnackbarComponent
          snackbarOpen={snackbarOpen}
          snackbarMsg={snackbarMsg}
          severity={severity}
          handleSnackbarClose={handleSnackbarClose}
        />
      )}
      <Grid item xs={12} md={6} sx={{textAlign:'center'}}>
        {/* <Card variant="outlined" className="paddingall" style={{ display: "flex", justifyContent: "center", width: "100%", height: "200px" }}> */}
        {/* <Card
          style={{
            borderRadius: "0%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            cursor: "pointer",
            padding: "20px",
          }}
        > */}
          <UploadFileComponent
            files={[...files]}
            setFiles={setFiles}
            filesForS3={filesForS3}
            setFilesForS3={setFilesForS3}
            setOpenConfirm={setOpenConfirm}
            path={`${currentUser.uid}/${id}/`}
            S3folder='task_file_uploads'
            showSubmitButton
          />
      </Grid>
    </Grid>
  );
}
