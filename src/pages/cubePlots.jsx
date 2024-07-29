import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Sidenav from "../components/NavBars/Sidenav";
import ResponsiveAppBar from "../components/NavBars/ResNav";
import Loading from "../components/commonComponents/Loading";
import JSZip from "jszip";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import "../components/Dashboard/dash.css";

export default function Bokeh() {
  const [loading, setLoading] = useState(true);
  const [htmlUrls, setHtmlUrls] = useState([]);

  
  useEffect(() => {
    const fetchAndExtractZip = async () => {
      const storage = getStorage();
      const zipRef = ref(storage, 'Animations/CubePlots/Cubes.zip');

      try {
        // Fetch the ZIP file
        const url = await getDownloadURL(zipRef);
        const response = await fetch(url);
        const blob = await response.blob();

        // Load the ZIP file
        const zip = await JSZip.loadAsync(blob);

        // Extract HTML files
        const fileNames = Object.keys(zip.files);
        const htmlFiles = fileNames.filter(name => name.endsWith('.html'));

        const htmlPromises = htmlFiles.map(async (fileName) => {
          const file = zip.files[fileName];
          const content = await file.async("text");

          // Basic validation to check if the content starts with HTML tags
          if (content.trim().startsWith("<html") || content.trim().startsWith("<!DOCTYPE html")) {
            const blob = new Blob([content], { type: "text/html" });
            return URL.createObjectURL(blob);
          } else {
            console.warn(`File ${fileName} does not appear to be valid HTML.`);
            return null; // Skip this file
          }
        });

        const urls = (await Promise.all(htmlPromises)).filter(url => url !== null);

        setHtmlUrls(urls);
      } catch (error) {
        console.error("Failed to load and extract ZIP file:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndExtractZip();
  }, []);

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
                    {htmlUrls.map((url, index) => (
                      <iframe key={index} src={url} width="940" height="640" />
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
