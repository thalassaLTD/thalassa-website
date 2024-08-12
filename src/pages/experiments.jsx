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
  const [htmlFiles, setHtmlFiles] = useState([]); // State to store files with names and metadata
  const [selectedFolder, setSelectedFolder] = useState('');
  const [selectedFileTitles, setSelectedFileTitles] = useState([]);
  const [fileTitleToUrl, setFileTitleToUrl] = useState({}); // Mapping of titles to URLs

  const webText = {
    "DPR1.mp4": {
      "Title": "DPR1 Depression Prevalence and Growth for Greater London",
      "Paragraph": "This is a paragraph for DPR1",
      "Location": "Greater London",
      "Link": "https://github.com/mauriceUCL/depression-resarch/blob/main/1.ExpCode/DPR/DPR1.ipynb"
    },
    "DPR2.mp4": {
      "Title": "DPR2 Depression Prevalence and Growth for Greater London",
      "Paragraph": "This is a paragraph for DPR2",
      "Location": "Greater London",
      "Link": "https://github.com/mauriceUCL/depression-resarch/blob/main/1.ExpCode/DPR/DPR1.ipynb"

    },
    "PPR1.mp4": {
      "Title": "PPR1 Prescription Prevalence for Greater London",
      "Paragraph": "Data contains both population and patient prevelance, the intention is to pick one or the other (probably patient-prevelance because this relates more to the prescriptions,",
      "Location": "Greater London",
      "Link": "https://github.com/mauriceUCL/depression-resarch/blob/main/1.ExpCode/DPR/DPR1.ipynb"

    },
    "DGD1.mp4": {
      "Title": "DGD1 Prescription Prevalence and Growth for Greater London",
      "Paragraph": "This is a paragraph for DPR2",
      "Location": "Greater London",
      "Link": "https://github.com/mauriceUCL/depression-resarch/blob/main/1.ExpCode/DPR/DPR1.ipynb"

    }
  };

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
          const name = itemRef.name;
          const title = webText[name]?.Title || name; // Use title from webText or fallback to filename
          return { name, url, title, ...webText[name] }; // Add metadata from webText
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
                              <video width="920" height="520" controls>
                                <source src={url} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                              {file && (
                                <Box sx={{ marginTop: '8px' }}>
                                  <h3>{file.Title}</h3>
                                  <p>{file.Paragraph}</p>
                                  <a href={file.Link}  target="_blank"> Code Link</a>
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
