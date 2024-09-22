import React, { useEffect, useState } from "react";
import { Box, Paper, Tooltip } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info'; import Grid from "@mui/material/Grid";
import Sidenav from "../components/NavBars/Sidenav";
import ResponsiveAppBar from "../components/NavBars/ResNav";
import Loading from "../components/commonComponents/Loading";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import CitySelector from "../components/TemporalAnimations/CitySelector";
import ExperimentSelector from "../components/TemporalAnimations/ExperimentSelector";
import TrendSelector from "../components/TemporalAnimations/TrendSelector";
import VideoDisplay from "../components/TemporalAnimations/VideoDisplay";
import TooltipHeader from '../components/TooltipHeader';


import animationsJsonData from "../customizeThalassa/pvt-animationsData.json";

export default function Experiments() {
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState([]);
  const [htmlFiles, setHtmlFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [selectedFileTitles, setSelectedFileTitles] = useState([]);
  const [fileTitleToUrl, setFileTitleToUrl] = useState({});
  const [selectedArea, setSelectedArea] = useState("Greater London"); // City selection state
  const cities = ["Greater London", "Leicester", "Manchester", "Bristol"]; // Available cities

  useEffect(() => {
    const storage = getStorage();
    const experimentsRef = ref(storage, "Experiments/Temporal Animations/");

    listAll(experimentsRef)
      .then((res) => {
        const folderNames = ["Depression Prevalence (DPR)", "Morans I Depression Prevalence (BTP)", "Prescription Prevalence (PPR)", "Depression Growth Drivers (DGD)"];
        setFolders(folderNames);

        if (folderNames.length > 0) {
          const firstFolder = folderNames[0];
          setSelectedFolder(firstFolder);
          handleFolderChange({ target: { value: firstFolder } });
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Failed to load folders:", error);
        setLoading(false);
      });
  }, []);

  const handleFolderChange = (event) => {
    const folder = event.target.value;
    setSelectedFolder(folder);
    setLoading(true);

    const storage = getStorage();
    const folderRef = ref(storage, `Experiments/Temporal Animations/${selectedArea}/${folder}`);

    listAll(folderRef)
      .then((res) => {
        const filePromises = res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          const name = itemRef.name;
          const title = animationsJsonData[name]?.Title || name;
          return { name, url, title, ...animationsJsonData[name] };
        });
        return Promise.all(filePromises);
      })
      .then((files) => {
        setHtmlFiles(files);
        const titleToUrl = files.reduce((acc, file) => ({ ...acc, [file.title]: file.url }), {});
        setFileTitleToUrl(titleToUrl);
        if (files.length > 0) {
          const defaultTitle = files[0].title;
          setSelectedFileTitles([defaultTitle]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load HTML files:", error);
        setLoading(false);
      });
  };

  const handleFileChange = (event) => {
    const { target: { value } } = event;
    setSelectedFileTitles(typeof value === "string" ? value.split(",") : value);
  };

  const handleCityChange = (event) => {
    setSelectedArea(event.target.value); // Update city selection
  };

  return (
    <>
      {/* <ResponsiveAppBar /> */}
      <div className="bgcolor">
        <Box sx={{ display: "flex", height: "100%" }}>
          <Sidenav />
          <Box sx={{ padding: '20px' }}>
            <Paper style={{ padding: 16 }}>
              <TooltipHeader
                tooltipText="The data used from England and Wales Depression and Prescriptions and animations made on different cities"
                headerText={animationsJsonData.HeadTitle}
                headerVariant="h4"
              />


              <>{animationsJsonData.SubTitle1}</>

              <Grid container spacing={2} className="paddingall">
                <Grid item xs={12} md={4}>
                  <Box>
                    <CitySelector selectedArea={selectedArea} handleCityChange={handleCityChange} cities={cities} />
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box>
                    <ExperimentSelector selectedFolder={selectedFolder} handleFolderChange={handleFolderChange} folders={folders} />
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box>
                    <TrendSelector htmlFiles={htmlFiles} selectedFileTitles={selectedFileTitles} handleFileChange={handleFileChange} />
                  </Box>
                  <Grid item xs={12} sm={12}>
                    (Deselect all Trends when switching between experiments)
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <VideoDisplay selectedFileTitles={selectedFileTitles} fileTitleToUrl={fileTitleToUrl} htmlFiles={htmlFiles} />
                  </Box>

                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Box>
      </div>
    </>
  );
}
