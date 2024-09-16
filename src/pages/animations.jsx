import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Sidenav from "../components/NavBars/Sidenav";
import ResponsiveAppBar from "../components/NavBars/ResNav";
import Loading from "../components/commonComponents/Loading";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import Paper from "@mui/material/Paper";

import CitySelector from "../components/TemporalAnimations/CitySelector";
import ExperimentSelector from "../components/TemporalAnimations/ExperimentSelector";
import TrendSelector from "../components/TemporalAnimations/TrendSelector";
import VideoDisplay from "../components/TemporalAnimations/VideoDisplay";

import animationsJsonData from "../customizeThalassa/pvt-animationsData.json";

export default function Experiments() {
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState([]);
  const [htmlFiles, setHtmlFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [selectedFileTitles, setSelectedFileTitles] = useState([]);
  const [fileTitleToUrl, setFileTitleToUrl] = useState({});
  const [selectedCity, setSelectedCity] = useState("London"); // City selection state
  const cities = ["London", "Leicester", "Manchester", "Bristol"]; // Available cities

  useEffect(() => {
    const storage = getStorage();
    const experimentsRef = ref(storage, "Experiments/Temporal Animations/");

    listAll(experimentsRef)
      .then((res) => {
        const folderNames = ["Depression Prevalence (DPR)", "Prescription Prevalence (PPR)", "Depression Growth Drivers (DGD)"];
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
    const folderRef = ref(storage, `Experiments/Temporal Animations/${selectedCity}/${folder}`);

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
    setSelectedCity(event.target.value); // Update city selection
  };

  return (
    <>
      {/* <ResponsiveAppBar /> */}
      <div className="bgcolor">
        <Box sx={{ display: "flex", height: "100%" }}>
          <Sidenav />
          {loading && <Loading />}
          {!loading && (
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Paper style={{ padding: 16 }}>
                <Box height={20} />
                <Box height={10} />
                <h1>{animationsJsonData.HeadTitle}</h1>
                <>{animationsJsonData.SubTitle1}</>
                <Grid container spacing={2} className="paddingall">
                  <Grid item xs={12}>
                    <Box>
                      <CitySelector selectedCity={selectedCity} handleCityChange={handleCityChange} cities={cities} />
                      <ExperimentSelector selectedFolder={selectedFolder} handleFolderChange={handleFolderChange} folders={folders} />
                      <TrendSelector htmlFiles={htmlFiles} selectedFileTitles={selectedFileTitles} handleFileChange={handleFileChange} />
                      <VideoDisplay selectedFileTitles={selectedFileTitles} fileTitleToUrl={fileTitleToUrl} htmlFiles={htmlFiles} />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          )}
        </Box>
      </div>
    </>
  );
}
