import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Sidenav from "../components/NavBars/Sidenav";
import ResponsiveAppBar from "../components/NavBars/ResNav";
import Loading from "../components/commonComponents/Loading";

import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { FormControl, InputLabel, Select, MenuItem, Checkbox, FormGroup, FormControlLabel } from "@mui/material";

export default function Bokeh() {
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileSelections, setFileSelections] = useState({});

  useEffect(() => {
    const fetchFolders = async () => {
      const storage = getStorage();
      const baseRef = ref(storage, '/Experiments/Interactive Plots/');

      try {
        const res = await listAll(baseRef);
        const folderPromises = res.prefixes.map(async (folderRef) => {
          const folderRes = await listAll(folderRef);
          const files = await Promise.all(folderRes.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return { name: itemRef.name, url };
          }));
          return {
            folderName: folderRef.name,
            files
          };
        });

        const folderData = await Promise.all(folderPromises);
        setFolders(folderData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load folders and files:", error);
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  const handleFolderChange = (event) => {
    const folderName = event.target.value;
    const folder = folders.find(f => f.folderName === folderName);
    if (folder) {
      setSelectedFolder(folderName);
      setFiles(folder.files);
      setFileSelections({}); // Reset file selections
      setSelectedFiles([]);
    }
  };

  const handleFileSelection = (event) => {
    const url = event.target.value;
    setFileSelections(prev => ({
      ...prev,
      [url]: !prev[url]
    }));
  };

  useEffect(() => {
    const selected = Object.keys(fileSelections).filter(url => fileSelections[url]);
    setSelectedFiles(selected);
  }, [fileSelections]);

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
              <Grid container spacing={2} className="paddingall">
                <Grid item xs={12}>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel>Select Experiment</InputLabel>
                      <Select
                        value={selectedFolder}
                        onChange={handleFolderChange}
                        label="Select Experiment"
                      >
                        <MenuItem value=""><em>Select a folder</em></MenuItem>
                        {folders.map((folder, index) => (
                          <MenuItem key={index} value={folder.folderName}>{folder.folderName}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {files.length > 0 && (
                      <Box mt={2}>
                        <h2>Select Files</h2>
                        <FormGroup>
                          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {files.map((file, index) => (
                              <FormControlLabel
                                key={index}
                                control={
                                  <Checkbox
                                    checked={fileSelections[file.url] || false}
                                    onChange={handleFileSelection}
                                    value={file.url}
                                  />
                                }
                                label={file.name}
                                style={{ marginRight: '16px' }} // Optional: Adjust spacing between items
                              />
                            ))}
                          </div>
                        </FormGroup>
                      </Box>
                    )}

                    {selectedFiles.length > 0 && (
                      <Box mt={2}>
                        <h2>Selected Files</h2>
                        {selectedFiles.map((url, index) => (
                          <iframe key={index} src={url} width="50%" height="640" />
                        ))}
                      </Box>
                    )}
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
