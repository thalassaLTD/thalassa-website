import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Sidenav from "../components/NavBars/Sidenav";
import ResponsiveAppBar from "../components/NavBars/ResNav";
import Loading from "../components/commonComponents/Loading";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText } from "@mui/material";

import animationsJsonData from "../customizeThalassa/animationsData.json";

export default function Experiments() {
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState([]);
  const [htmlFiles, setHtmlFiles] = useState([]); // State to store files with names and metadata
  const [selectedFolder, setSelectedFolder] = useState('');
  const [selectedFileTitles, setSelectedFileTitles] = useState([]);
  const [fileTitleToUrl, setFileTitleToUrl] = useState({}); // Mapping of titles to URLs

  useEffect(() => {
    const storage = getStorage();
    const experimentsRef = ref(storage, 'Experiments/');

    // Fetch folders in Experiments/
    listAll(experimentsRef)
      .then((res) => {
        const folderNames = res.prefixes.map((folderRef) => folderRef.name);
        setFolders(folderNames);

        if (folderNames.length > 0) {
          // Automatically select the first folder
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
    const folderRef = ref(storage, `Experiments/${folder}`);

    listAll(folderRef)
      .then((res) => {
        const filePromises = res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          const name = itemRef.name;
          const title = animationsJsonData[name]?.Title || name; // Use title from animationsJsonData or fallback to filename
          return { name, url, title, ...animationsJsonData[name] }; // Add metadata from animationsJsonData
        });
        return Promise.all(filePromises);
      })
      .then((files) => {
        setHtmlFiles(files); // Store files with names and URLs
        const titleToUrl = files.reduce((acc, file) => ({ ...acc, [file.title]: file.url }), {});
        setFileTitleToUrl(titleToUrl);
        if (files.length > 0) {
          const defaultTitle = files[0].title;
          setSelectedFileTitles([defaultTitle]); // Set the first file title as the default selected title
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load HTML files:", error);
        setLoading(false);
      });
  };

  const handleFileChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedFileTitles(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <>
      <ResponsiveAppBar />
      <div className="bgcolor">
        <Box sx={{ display: "flex", height: "100%" }}>
          <Sidenav />
          {loading && <Loading />}
          {!loading && (
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Box height={20} />
              <Box height={10} />
              <h1>{animationsJsonData.HeadTitle}</h1>
              <>{animationsJsonData.SubTitle1}</>
              <Grid container spacing={2} className="paddingall">
                <Grid item xs={12}>
                  <Box>
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel>Select Experiment</InputLabel>
                      <Select
                        value={selectedFolder}
                        onChange={handleFolderChange}
                        renderValue={(selected) => selected}
                        label="Select Experiment"
                      >
                        {folders.map((folder) => (
                          <MenuItem key={folder} value={folder}>
                            {folder}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {htmlFiles.length > 0 && (
                      <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel>Select Trend</InputLabel>
                        <Select
                          multiple
                          value={selectedFileTitles}
                          onChange={handleFileChange}
                          label="Select Trend"
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Box key={value} sx={{ border: '1px solid #ccc', borderRadius: 1, padding: '2px 4px' }}>
                                  {value}
                                </Box>
                              ))}
                            </Box>
                          )}
                        >
                          {htmlFiles.map((file) => (
                            <MenuItem key={file.title} value={file.title}>
                              <Checkbox checked={selectedFileTitles.indexOf(file.title) > -1} />
                              <ListItemText primary={file.title} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}

                    {selectedFileTitles.map((title, index) => {
                      const url = fileTitleToUrl[title];
                      const file = htmlFiles.find(file => file.title === title);
                      return (
                        <Box key={index} sx={{ marginTop: '16px' }}>
                          {url && (
                            <>
                              <video width="1200" height="800" controls>
                                <source src={url} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                              {file && (
                                <Box sx={{ marginTop: '8px' }}>
                                  <h3>{file.Title}</h3>
                                  <p>{file.Paragraph}</p>
                                  <a href={file.Link} target="_blank"> Code Link</a>
                                </Box>
                              )}
                            </>
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </div>
    </>
  );
}
