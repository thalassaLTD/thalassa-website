import React, { useCallback, useEffect, useState } from "react";
import { Box, Paper, Typography, Grid, Divider } from "@mui/material";
import Sidenav from "../components/NavBars/Sidenav";
import CitySelector from "../components/TemporalAnimations/CitySelector";
import ExperimentSelector from "../components/TemporalAnimations/ExperimentSelector";
import TrendSelector from "../components/TemporalAnimations/TrendSelector";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Loading from "../components/commonComponents/Loading";
import AnimationFilters from "../components/TemporalAnimations/AnimationFilters";
import MarkupAnimation from "../components/TemporalAnimations/MarkupAnimation";

export default function Experiments() {
  const [loading, setLoading] = useState(true);
  const [folders, setFolders] = useState([]);
  const [htmlFiles, setHtmlFiles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [selectedFileTitles, setSelectedFileTitles] = useState([]);
  const [fileTitleToUrl, setFileTitleToUrl] = useState({});
  const [selectedArea, setSelectedArea] = useState("Greater London");
  const [paragraphs, setParagraphs] = useState({});
  const [animationsJsonData, setAnimationsJsonData] = useState({});
  const cities = ["Greater London", "Leicester", "Manchester", "Bristol"];

  const storage = getStorage();

  // Fetch JSON data from Firebase Storage
  const fetchJsonData = () => {
    setLoading(true);
    const jsonFileRef = ref(storage, "Other Assets/pvt-animationsData.json");

    getDownloadURL(jsonFileRef)
      .then((url) => {
        // Fetch JSON content from the provided URL
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setAnimationsJsonData(data);
            // // Delay the loading state change by 5 seconds (5000 milliseconds)
            setTimeout(() => {
              setLoading(false);
            }, 0);
          })
          .catch((error) => {
            console.error("Error fetching JSON data:", error);
            setLoading(false); // No delay for error case
          });
      })
      .catch((error) => {
        console.error("Failed to get JSON file URL:", error);
        setLoading(false); // No delay for error case
      });
  };

  // Load JSON data on initial render
  useEffect(() => {
    fetchJsonData();
  }, []);

  useEffect(() => {
    if (selectedFolder && Object.keys(animationsJsonData).length > 0) {
      setLoading(true);

      const folderRef = ref(
        storage,
        `Experiments/Temporal Animations/${selectedArea}/${selectedFolder}`
      );

      listAll(folderRef)
        .then((res) => {
          const filePromises = res.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            const name = itemRef.name;
            const title = animationsJsonData[name]?.Title || name;
            const location = animationsJsonData[name]?.Location || name;
            return { name, url, title, location, ...animationsJsonData[name] };
          });
          return Promise.all(filePromises);
        })
        .then((files) => {
          setHtmlFiles(files);
          const titleToUrl = files.reduce(
            (acc, file) => ({ ...acc, [file.title]: file.url }),
            {}
          );
          setFileTitleToUrl(titleToUrl);

          if (files.length > 0) {
            const defaultTitle = files[0].title;
            setSelectedFileTitles([defaultTitle]);
            setParagraphs({ [defaultTitle]: files[0].Paragraph || "" });
          } else {
            setSelectedFileTitles([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to load HTML files:", error);
          setLoading(false);
        });
    }
  }, [selectedFolder, animationsJsonData]);

  // Fetch folders from Firebase Storage
  useEffect(() => {
    setLoading(true);
    const experimentsRef = ref(storage, "Experiments/Temporal Animations/");

    listAll(experimentsRef)
      .then((res) => {
        const folderNames = [
          "Depression Prevalence (DPR)",
          "Morans I Depression Prevalence (BTP)",
          "Prescription Prevalence (PPR)",
          "Depression Growth Drivers (DGD)",
        ];
        setFolders(folderNames);

        if (folderNames.length > 0) {
          const firstFolder = folderNames[0];
          setSelectedFolder(firstFolder);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Failed to load folders:", error);
        setLoading(false);
      });
  }, []);

  const handleFolderChange = useCallback((event) => {
    setSelectedFolder(event.target.value);
    setIsEditing(false);
  }, []);

  const handleFileChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedFiles = typeof value === "string" ? value.split(",") : value;

    // Update selected file titles
    setSelectedFileTitles(selectedFiles);

    // Load paragraphs for all selected files
    const newParagraphs = selectedFiles.reduce((acc, fileTitle) => {
      const selectedFile = htmlFiles.find((file) => file.title === fileTitle);
      return {
        ...acc,
        [fileTitle]: selectedFile?.Paragraph || "", // Add paragraph for each file title
      };
    }, {});

    setParagraphs(newParagraphs);
  };
  const handleParagraphChange = (title, newParagraph) => {
    setParagraphs((prev) => ({
      ...prev,
      [title]: newParagraph, // Use title instead of name as key
    }));
  };

  const handleSaveParagraph = (name, title) => {
    const jsonFileRef = ref(storage, "Other Assets/pvt-animationsData.json");

    // Fetch the existing JSON file from Firebase Storage
    getDownloadURL(jsonFileRef)
      .then((url) => fetch(url)) // Fetch the JSON content
      .then((response) => response.json())
      .then((data) => {
        // Ensure the paragraphs are being updated correctly
        // if (data[name]) {
        //   data[name].Paragraph = paragraphs[name]; // Update existing entry
        // } else {
        // If the title doesn't exist, add it
        // console.log(name, title, paragraphs);
        data[name].Paragraph = paragraphs[title];
        // data[name] = {
        //   // Title: title,
        //   Paragraph: paragraphs[title] || "", // Use title as key
        // };
        // }

        // Upload the updated JSON back to Firebase Storage
        const updatedJson = JSON.stringify(data);

        // Use uploadString with content type specified
        uploadString(jsonFileRef, updatedJson, "raw", {
          contentType: "application/json",
        })
          .then(() => {
            setIsEditing(false);
            fetchJsonData();
            // console.log(`Paragraph for ${title} has been saved successfully!`);
            // console.log("Updated JSON Data:", data);
          })
          .catch((error) => {
            console.error("Failed to upload updated JSON data:", error);
          });
      })
      .catch((error) => {
        console.error("Failed to fetch or update JSON data:", error);
      });
  };

  const handleCityChange = (event) => {
    setSelectedArea(event.target.value);
    fetchJsonData(); // Fetch JSON data on city change
  };

  if (loading) {
    // Show a loading spinner or message while data is being fetched
    return <Loading />;
  }

  return (
    <div className="bgcolor">
      <Box sx={{ display: "flex", height: "100%" }}>
        <Sidenav />
        <Box sx={{ padding: "20px" }}>
          <Paper style={{ padding: 16 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <h2 style={{ marginRight: 8 }}>{animationsJsonData.HeadTitle}</h2>
            </Box>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ backgroundColor: "lightgrey" }}
              >
                <strong> Summary of Analysis available here </strong>
              </AccordionSummary>
              <AccordionDetails>
                DPR and PPR: Primary Analysis directly showing spatial data
                <br /> <br />
                <strong>Depression Prevelance and Growth = DPR</strong>
                <br /> Direct Display of Spatial Analysis over time
                <br /> DPR1 - Depression Prevelance: % of all GP registered
                patients diganosed as depressed in each LSOA
                <br /> DPR2 - Depression Growth: % annual change of DPR1 in each
                LSOA
                <br /> <br />
                <strong> Prescriptions Prevelance and Growth = PPR </strong>
                <br /> PPR1 - Prescriptions Prevelance: % of all GP registered
                patients with anti-depressant prescription in each LSOA
                <br /> PPR2 - Prescriptions Growth: % annual change of PPR1 in
                each LSOA
                <br /> PPR3 - Prescription Items per Depressed Patient PPR1/DPR1
                <br /> <br />
                <strong> Depression Growth Drivers = DGD </strong>
                <br /> Exploratory Spatial Analysis over time and time snapshots
                <br /> <> (Some animations start from 2014 - 2022) </>
                <br /> DGD1 - Depression Growth vs Items per Patient Global
                <br /> DGD2 - LocalR2: Depression Growth vs Prior Year Items per
                Patient
                <br /> DGD3 - LocalR2: Depression Prevelance vs Prior Year Items
                per Patient
                <br /> DGD4 - Depression Growth (Alternative Depression Growth
                Groups)
                <br /> DGD5 - LocalR2: Depression Growth vs Prior Year
                Depresssion Prevalence
                <br /> <br />
                <strong> Benchmark Tsimpidia Paper = BTP </strong>
                <br /> Benchmark: Unravelling the dynamics of mental health
                inequalities in England, Tsimpida et al (2024)
                <br /> BTP4 - Morans I Depression Prevalence LISA CLusters
              </AccordionDetails>
            </Accordion>
            <br />

            <AnimationFilters
              selectedArea={selectedArea}
              handleCityChange={handleCityChange}
              cities={cities}
              selectedFolder={selectedFolder}
              handleFolderChange={handleFolderChange}
              folders={folders}
              htmlFiles={htmlFiles}
              selectedFileTitles={selectedFileTitles}
              handleFileChange={handleFileChange}
            />
          </Paper>

          <Grid item xs={12}>
            <Box>
              {selectedFileTitles.map((title) => {
                const file = htmlFiles.find((file) => file.title === title);
                return (
                  <MarkupAnimation
                    key={title}
                    file={file}
                    isEditing={isEditing}
                    paragraphs={paragraphs}
                    setIsEditing={setIsEditing}
                    handleParagraphChange={handleParagraphChange}
                    handleSaveParagraph={handleSaveParagraph}
                    title={title}
                    fileTitleToUrl={fileTitleToUrl}
                  />
                );
              })}
            </Box>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
