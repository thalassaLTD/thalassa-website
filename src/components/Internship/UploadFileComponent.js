import { Button, Chip, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { S3BucketName, S3Download,  } from "../../aws-exports.js";
import { v4 as uuidv4 } from "uuid";
import { useDropzone } from "react-dropzone";
import { Box, Container, Stack } from "@mui/system";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";

export default function UploadFileComponent({
    files,
   setFiles,
    filesForS3,
    setFilesForS3,
    setOpenConfirm,
    path,
    S3folder,
    showUpload,
    setShowUpload,
    showSubmitButton
}) {
  const { acceptedFiles, getRootProps, getInputProps,isDragActive, isDragAccept } = useDropzone({ maxFiles: 1});

  useEffect(() => {
    if(acceptedFiles.length>0&&acceptedFiles.length<2){
        handleSingleFileUpload(acceptedFiles);
    }
  }, [acceptedFiles]);

//   const handleFileUpload = (newFiles) => {
//     let s3Files = [...filesForS3];
//     let filesToUpload = newFiles.map((file) => {
//       const randomString = uuidv4();
//       const params = {
//         ACL: "public-read",
//         Body: file,
//         Bucket: S3BucketName,
//         Key: `${S3folder}/${randomString}/${path}` + file.name,
//       };
//       s3Files = [...s3Files, params];
//       return {
//         file_name: file.name,
//         file_path: `${S3folder}/${randomString}/${path}` + file.name,
//       };
//     });
//     setFiles([...files, ...filesToUpload]);
//     setFilesForS3(s3Files);
//   };
    const handleSingleFileUpload = (newFiles) => {
        let s3Files = [...filesForS3];
        let filesToUpload = newFiles.map((file) => {
          const randomString = uuidv4();
          const params = {
            ACL: "public-read",
            Body: file,
            Bucket: S3BucketName,
            Key: `${S3folder}/${randomString}/${path}/` + file.name,
          };
          s3Files = [params];
          return {
            file_name: file.name,
            file_path: `${S3folder}/${randomString}/${path}/` + file.name,
          };
        });
        setFiles([...filesToUpload]);
        setFilesForS3(s3Files);
      };

  
  const handleDeleteFile = (deletedFile) => {
    const fileIndex = files.findIndex(
      (file) => file.file_path === deletedFile.file_path
    );
    const deletedTaskFile = files.splice(fileIndex, 1)[0];
    const newS3Files = [...filesForS3];
    const S3Index = filesForS3.findIndex(
      (file) => file.Key === deletedTaskFile.file_path
    );
    if(S3Index>-1){
      newS3Files.splice(S3Index, 1);
    }
    setFilesForS3(newS3Files);
    setFiles(files);
  };

  const fileList = () => {
    return (
      <Grid container spacing={2} sx={{mb:2}}>
        {files?.length>0 && files.map((file,i) => (
          <Grid item  key={i}>
            {" "}
            <Chip
              key={i}
              label={file.file_name}
              onDelete={() => handleDeleteFile(file)}
              variant="outlined"
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <>
    <Stack spacing={2}>
      <Box
        sx={{ border: "2px dashed grey", borderRadius: "10px" }}
        className="container"
      >
        <Container
          sx={{ cursor: "pointer" }}
          {...getRootProps({ className: "dropzone" })}
        >
          <input {...getInputProps()} className={isDragActive ? 'active' : ''}/>
          <Stack
            sx={{ cursor: "pointer", p: 5 }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <BackupOutlinedIcon fontSize="large" />
            <Typography textAlign="center" variant="body1">
              Drag & Drop to Upload File
              <br />
              Or Click to Browse
            </Typography>
          </Stack>
        </Container>
      </Box>
      {fileList()}
      
    </Stack>
    {files && showSubmitButton && (
      <Button
        variant="contained"
        size="small"
        sx={{
          backgroundColor: "#123860",
          borderRadius: 20,
          mt:2,
          px:4,
          py:1
        }}
        // onClick={() => uploadFile(file, id)}
        onClick={() => setOpenConfirm(true)}
        disabled={files?.length===0 }
      >
        Submit
      </Button>
    )}
    {showUpload && <Button variant="outlined" sx={{borderRadius: 20,mt:2,ml:2, px:3,py:.75}} onClick={()=>setShowUpload(false)}>Cancel</Button>}
    
    </>
  );
}
