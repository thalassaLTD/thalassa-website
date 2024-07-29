import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Sidenav from "../components/NavBars/Sidenav";
import ResponsiveAppBar from "../components/NavBars/ResNav";
import Loading from "../components/commonComponents/Loading";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText } from "@mui/material";

export default function Experiments() {
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState([]);
  const [htmlFiles, setHtmlFiles] = useState([]); // Updated state to store files with names
  const [selectedFolder, setSelectedFolder] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    const storage = getStorage();
    const experimentsRef = ref(storage, 'Experiments/');

    // Fetch folders in Experiments/
    listAll(experimentsRef)
      .then((res) => {
        const folderPromises = res.prefixes.map((folderRef) => folderRef.name);
        setFolders(folderPromises);
        setLoading(false);
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
          return { name: itemRef.name, url };
        });
        return Promise.all(filePromises);
      })
      .then((files) => {
        setHtmlFiles(files); // Store files with names and URLs
        if (files.length > 0) {
          setSelectedFiles([files[0].url]); // Set the first file as the default selected file
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
    setSelectedFiles(
      (typeof value === 'string' ? value.split(',') : value)
    );
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
                          value={selectedFiles}
                          onChange={handleFileChange}
                          label="Select Trend"

                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Box key={value} sx={{ border: '1px solid #ccc', borderRadius: 1, padding: '2px 4px' }}>
                                  {htmlFiles.find(file => file.url === value)?.name}
                                </Box>
                              ))}
                            </Box>
                          )}
                        >
                          {htmlFiles.map((file) => (
                            <MenuItem key={file.name} value={file.url}>
                              <Checkbox checked={selectedFiles.indexOf(file.url) > -1} />
                              <ListItemText primary={file.name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}

                    {selectedFiles.map((url, index) => (
                      // <iframe
                      //   key={index}
                      //   src={url}
                      //   width="940"
                      //   height="640"
                      //   title={`Selected File ${index + 1}`}
                      //   style={{ marginTop: '16px' }}
                      // />
                      <video key={index} width="920" height="520" controls>
                        <source src={url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ))}
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
