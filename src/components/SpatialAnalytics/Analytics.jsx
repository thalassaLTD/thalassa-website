import { Box, Divider, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";

function Analytics({
  year,
  url,
  spatialAnalyticsJsonData,
  mapFormat,
  folder,
  fetchJsonData,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [paragraphs, setParagraphs] = useState("");

  useEffect(() => {
    setParagraphs(
      spatialAnalyticsJsonData?.[mapFormat]?.[folder]?.[year] || ""
    );
  }, [spatialAnalyticsJsonData, year, folder, mapFormat]);

  const storage = getStorage();

  const handleSaveParagraph = () => {
    const jsonFileRef = ref(
      storage,
      "Other Assets/pvt-spatialAnalyticsData.json"
    );

    // Fetch the existing JSON file from Firebase Storage
    getDownloadURL(jsonFileRef)
      .then((url) => fetch(url)) // Fetch the JSON content
      .then((response) => response.json())
      .then((data) => {
        console.log("All json data ", data);

        data[mapFormat][folder][year] = paragraphs;

        // Upload the updated JSON back to Firebase Storage
        const updatedJson = JSON.stringify(data);

        // Use uploadString with content type specified
        uploadString(jsonFileRef, updatedJson, "raw", {
          contentType: "application/json",
        })
          .then(() => {
            setIsEditing(false);
            fetchJsonData();
          })
          .catch((error) => {
            console.error("Failed to upload updated JSON data:", error);
          });
      })
      .catch((error) => {
        console.error("Failed to fetch or update JSON data:", error);
      });
  };

  return (
    <>
      <Typography variant="h5" sx={{ mt: 5, p: 1 }}>
        {year}
      </Typography>

      <iframe
        key={year}
        src={url}
        style={{
          width: "80%",
          height: "600px",
          border: "none",
          marginBottom: "20px",
        }}
        title={`Spatial Analysis for ${year}`}
      />

      <Divider />
      {!isEditing ? (
        <Box display={"flex"} gap={1}>
          <Typography>
            {spatialAnalyticsJsonData?.[mapFormat]?.[folder]?.[year] || ""}
          </Typography>
          <EditIcon
            style={{ cursor: "pointer" }}
            onClick={() => setIsEditing(true)}
          />
        </Box>
      ) : (
        <>
          <Typography variant="body1">
            <textarea
              rows={5}
              style={{ width: "100%", height: "auto" }}
              value={paragraphs}
              onChange={(e) => setParagraphs(e.target.value)}
            />
          </Typography>
          <button onClick={() => handleSaveParagraph()}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      )}
    </>
  );
}

export default Analytics;
