import { React, useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  TextField,
  MenuItem,
  Stack,
  Select,
  Autocomplete,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import FilterComponent, { convertToFilter, filterData, getObjValueList } from "../commonComponents/FilterComponent";
import SearchComponent, { searchInList } from "../commonComponents/SearchComponent";
import { useDeferredValue } from "react";

const useStyles = createUseStyles((theme) => ({
  overlayImage: {
    position: "absolute",
    maxWidth: "50%",
    maxHeight: "50%",
    bottom: 0,
    display: "block", // set display to block to remove any extra whitespace
    transform: "translateY(50%)",
    borderRadius: "4px",
    background: "#fff",
    boxShadow:
      "0px 3px 6px 3px rgba(0,0,0,0.3), 0px 1px 4px 3px rgba(0,0,0,0.2)",
  },
  bannerContainer: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },
  card: {
    maxWidth: 345,
    borderRadius: 0,
    paddingBottom: 6,
    borderRadius: "4px",
    transition: "all .15s",
    "&:hover": {
      boxShadow: "0px 3px 3px 3px rgba(0,0,0,0.2)",
      transform: "scale(1.03)",
    },
    height:'100%'
  },
  autocomplete: {
    "& .MuiAutocomplete-option Mui-focused": {
      background: "rgba(18,56,96,.4)",
      color: "#fff",
    },
  },
  search: {
    width: "100%",
    marginBottom:'16px'
  },
}));

const filterLabels={
  company_name: "Company",
  project_field: "Field",
  project_title: "Project",
}

export default function AllInternships({
  internships,
  studentDetails,
  showEnrolled,
}) {
  const classes = useStyles();
  const [filteredInternships, setFilteredInternships] = useState([]);
  const DEPARTMENTS = [
    { value: "", label: "All" },
    { value: "Construction", label: "Construction" },
    { value: "Mechanical", label: "Mechanical" },
    { value: "Civil", label: "Civil" },
    { value: "AI", label: "AI" },
  ];
  const navigate = useNavigate();
  const [selectedProjectFields, setSelectedProjectFields] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [allProjectFields, setAllProjectFields] = useState([]);  
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query?.toLowerCase());
  const [filters, setFilters] = useState({});

  const onCardClick = (internship_id) => {
    navigate(`/company/${internship_id}`);
  };

  useEffect(() => {
    setFilteredInternships(internships);
    setAllCompanies([
      ...new Set([...internships.map((value) => value.company_name)]),
    ]);
    setAllProjectFields([
      ...new Set([...internships.map((value) => value.project_field)]),
    ]);
    const { company_name, project_field ,project_title} = getObjValueList(internships);
        setFilters({
          company_name: convertToFilter(company_name),
          project_field: convertToFilter(project_field),
          project_title: convertToFilter(project_title),
        });
  }, []);
  
  //for search
  useEffect(() => {
    if (internships?.length > 0) {
      const filtered = internships.filter(
        (internship) =>{
          const valuesToSearch=[internship?.project_field,internship?.company_name,internship?.project_title]
          return searchInList(valuesToSearch,deferredQuery)
        }
      );
      setFilteredInternships(filtered);
    }
  }, [deferredQuery]);

  useEffect(() => {
    const filtered = internships.filter(
      (selected) =>
        (selectedProjectFields.length === 0 ||
          selectedProjectFields.includes(selected.project_field)) &&
        (selectedCompanies.length === 0 ||
          selectedCompanies.includes(selected.company_name))
    );
    setFilteredInternships(filtered);
  }, [selectedCompanies, selectedProjectFields]);

  const filteredInternshipCards = (filterItems)=>{
    const filtered=filterData(filterItems,internships)
     setFilteredInternships([...filtered])
   }
 
   const resetFilter=(key)=>{
     const { [key]:val } = getObjValueList(internships);
    //  let valList= key==='core_skills'? val.join(',').split(','):val
      const valList=val
     const filterItems={...filters,[key]: convertToFilter(valList)}
     setFilters({...filterItems})
     filteredInternshipCards(filterItems)
   }

  const filterList = (projects, companies) => {
    return internships.filter(
      (selected) =>
        (projects.length === 0 || projects.includes(selected.project_field)) &&
        (companies.length === 0 || companies.includes(selected.company_name))
    );
  };
  

  const handleProjectFieldChange = (event, values) => {
    setSelectedProjectFields(values);
  };

  const handleCompanyNameChange = (event, values) => {
    setSelectedCompanies(values);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 6 }}>
  
          <Typography
           variant="h6"
           sx={{ fontWeight: 600,mb:2 }}
           color="#123860"
          >
            All Programs
          </Typography>
        
      <Grid container justifyContent="center">
        <Box className={classes.search}>
          <SearchComponent query={query} setQuery={setQuery}>
            <FilterComponent
              filters={{ ...filters }}
              filterList={filteredInternshipCards}
              filterLabels={filterLabels}
              resetFilter={resetFilter}
            />
          </SearchComponent>
        </Box>
      </Grid>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, lg: 9, xl: 12 }}
      >
        {filteredInternships?.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="subtitle1">No match found!</Typography>
          </Grid>
        )}
        {filteredInternships.map((internship,id) => {
          return (
            <Grid key={internship.internship_id} item xs={2} sm={4} lg={3} xl={3}>
              <Card
                className={classes.card}
                onClick={() => {
                  onCardClick(internship.internship_id);
                }}
              >
                <div className={classes.bannerContainer}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={internship.project_image}
                    alt="Project image"
                  />
                  <img
                    src={internship.company_logo}
                    alt=""
                    className={classes.overlayImage}
                  />
                </div>
                <CardContent sx={{ paddingTop: "7vh" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {internship.project_title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {internship.company_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {internship.project_field}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Estimated time: {internship.eta} Hours
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    sx={{
                      backgroundColor: "#123860",
                      borderRadius: 20,
                      pl: 4,
                      pr: 4,
                      pt: 1,
                      pb: 1,
                    }}
                    onClick={() => console.log("Apply button clicked")}
                  >
                    {studentDetails &&
                    studentDetails.enrolled_internships?.length > 0 &&
                    studentDetails.enrolled_internships.includes(
                      internship.project_id
                    )
                      ? "Continue to Program"
                      : "Apply now"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
