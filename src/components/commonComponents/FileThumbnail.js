import {
  Button,
  CircularProgress,
  Paper,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { IconContext } from "react-icons";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import {
  FaFilePdf,
  FaFileImage,
  FaFileVideo,
  FaFileWord,
  FaFileExcel,
  FaFile,
} from "react-icons/fa";

const iconColors = {
  pdf: "#ee5350",
  jpg: "#045bb3",
  jpeg: "#045bb3",
  png: "#045bb3",
  mp4: "#1976d2",
  avi: "#1976d2",
  mov: "#1976d2",
  doc: "#1976d2",
  docx: "#1976d2",
  xls: "#25a69a",
  xlsx: "#25a69a",
};
const backgroundColors = {
  pdf: "rgba(238, 83, 80,.2)",
  jpg: "rgba(4, 91, 179,.2)",
  jpeg: "rgba(4, 91, 179,.2)",
  png: "rgba(4, 91, 179,.2)",
  mp4: "rgba(25, 118, 210,.2",
  avi: "rgba(25, 118, 210,.2",
  mov: "rgba(25, 118, 210,.2)",
  doc: "rgba(25, 118, 210,.2)",
  docx: "rgba(25, 118, 210,.2)",
  xls: "rgba(37, 166, 154,.2)",
  xlsx: "rgba(37, 166, 154,.2)",
};

export function getFileType(fileExtension) {
  switch (fileExtension) {
    case "pdf":
      return <FaFilePdf />;
    case "jpg":
    case "jpeg":
    case "png":
      return <FaFileImage />;
    case "mp4":
    case "avi":
    case "mov":
      return <FaFileVideo />;
    case "doc":
    case "docx":
      return <FaFileWord />;
    case "xls":
    case "xlsx":
      return <FaFileExcel />;
    default:
      return <FaFile />;
  }
}

export default function FileThumbnail({
  file,
  id,
  buttonId,
  loading,
  S3Download,
  isDownloadable,
  children,
  customPadding={}
}) {
  const fileExtension = file?.file_path?.split('.').pop().toLowerCase();
  const fileTypeIcon = getFileType(fileExtension);
  const color = iconColors[fileExtension]
    ? iconColors[fileExtension]
    : iconColors.mov;
  const background = backgroundColors[fileExtension]
    ? backgroundColors[fileExtension]
    : iconColors.mov;
  return (
    <Paper
      key={id}
      sx={{
        ...(customPadding),
        width:'250px',
        background: `linear-gradient(to bottom right,rgba(255,255,255) 60%,${background} 100%)`,
        height:'100%'
      }}
    >
      <Grid container spacing={2} direction="column" justifyContent='space-between' sx={{ p: 3 }}>
        <Grid item xs={12}>
          <IconContext.Provider value={{ color: color, size: 50 }}>
            {fileTypeIcon}
          </IconContext.Provider>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight={600} mr="auto" sx={{lineBreak:'anywhere'}}>
            {file?.file_name}
          </Typography>
        </Grid>
        {isDownloadable && <Grid item xs={12}>
          <Box sx={{ position: "relative" }}>
            <Button
            endIcon={<CloudDownloadOutlinedIcon fontSize="large" />}
              disabled={loading && buttonId === id}
              onClick={() => S3Download(file, id)}
              sx={{
                pl: 0,
                textTransform: "none",
              }}
            >
              Click to Download
            </Button>

            {loading && buttonId === id && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </Grid>
        }
        {children}
      </Grid>
    </Paper>
  );
}
