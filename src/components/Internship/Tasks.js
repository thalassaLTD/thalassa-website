import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { post } from "../../components/Helper";
import Task from "./Task";
import Quiz from "./Quiz/Quiz";
import VideoRecording from "./VideoRecording";
import { AuthContext } from "../Auth/Auth";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const baseURL = "https://api.joinuplyft.com";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      
    >
      {value === index && (
        <Box sx={{ p: 3,px:12 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Tasks(props) {
  const params = useParams();
  const [id, setId] = useState('');
  const [internshipId, setInternshipId] = useState(props.internshipId);
  const [projectId, setProjectId] = useState(params["id"]);
  const [studentTaskData, setStudentTaskData] = useState({});
  const [taskTrackingData, setTaskTrackingData] = useState([]);
  const [interviewQuestions, setInterviewQuestions] = useState([]);

  useEffect(() => {
    setId(params["id"]);
  }, [params]);

  const { currentUser } = useContext(AuthContext);

  const [tabsData, setTabsData] = useState([]);
  const [value, setValue] = useState();

  const quiz = [
    {
      task_number: 4,
      task_title: "Quiz",
    },
  ];

  const video_interview = {
    task_number: 5,
    task_title: "Video Interview",
  };

  const [taskData, setTasksData] = useState([]);

  useEffect(() => {
  
    id && axios
      .post(baseURL + "/getProject", {
        project_id: id,
      })
      .then((response) => {
        setTasksData(response.data.tasks);
        setTabsData(response.data.tasks?.concat([{...quiz[0],task_number: response.data.tasks.length+1}], [{...video_interview,task_number:response.data.tasks.length+2}]));
        setValue(response.data.tasks[0]?.task_number);
      }).catch((err)=>{
        props.setSnackbarMsg('Some error occurred')
        props.setSeverity('error')
        props.setSnackbarOpen(true)
      });
  }, [id]);

  useEffect(() => {
    const reqData = { project_id: projectId };

    projectId && post("/getProject", reqData)
      .then((data) => {
        data?.interview_questions && setInterviewQuestions(data?.interview_questions);
      })
      .catch((error) => {
        console.error(error)
        props.setSnackbarMsg('Some error occurred')
        props.setSeverity('error')
        props.setSnackbarOpen(true)
      });
  }, [projectId]);

  useEffect(() => {

    fetchStudentTracking();
  }, [projectId]);

  useEffect(() => {
    taskTrackingData && setStudentTaskData(taskTrackingData)
  }, [taskTrackingData])

  const fetchStudentTracking = () => {
    const reqData = { project_id: projectId, student_id: currentUser.uid };
    post("/getStudentProjectTaskTracking", reqData)
      .then((data) => {
        setTaskTrackingData(data);
      })
      .catch((error) =>{
         console.error(error)
         props.setSnackbarMsg('Some error occurred')
         props.setSeverity('error')
         props.setSnackbarOpen(true)
        });
  };

  const isTaskDone = (task) => {
    if (studentTaskData) {
      if (task.task_title === "Quiz") {
        return studentTaskData?.quiz_score != null;
      } else if (task.task_title === "Video Interview") {
        return studentTaskData?.interview_video != null;
      } else if (studentTaskData.tasks_done) {
        let taskItem = studentTaskData.tasks_done.find(
          (studentTask) => studentTask.task_id === task.task_number.toString()
        );
        return taskItem?.task_file_submit.length > 0;
      }
    }
    return false;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNextTab = (tabNum) => {
    setValue(tabNum);
    window.scrollTo(0, 0);
  };
  return (
    <Box sx={{ width: "100%", backgroundColor: "whitesmoke", mt: 2 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        style={{ width: "100%" }}
        sx={{ width: "100%", backgroundColor: "#E3E6ED", mt: 2,px:11 }}
        variant="scrollable"
      >
        {tabsData?.map((tab,index) => (
          <Tab
            className="tab-item"
            disabled={index-1>=0 && !isTaskDone(tabsData[index-1])}
            icon={isTaskDone(tab) ? <CheckCircleOutlineIcon />:''}
            iconPosition="end"
            key={tab.task_number}
            value={tab.task_number}
            label={tab.task_title}
            wrapped={tab.wrapped}
          />
        ))}
      </Tabs>
      {tabsData?.map((tab, tabIndex) => (
        <TabPanel key={tab.task_number} value={value} index={tab.task_number}>
          <Task
            taskData={tab}
            internshipId={props.internshipId}
            projectId={projectId}
            taskTrackingData={taskTrackingData}
            interviewQuestions={interviewQuestions}
            setStudentTaskData={setStudentTaskData}
            studentTaskData={studentTaskData}
            fetchStudentTracking={fetchStudentTracking}
          />
          <Divider sx={{mt:'2rem'}}/>
          <Box >
          {tabIndex !== tabsData.length - 1 && (
            <Button
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: "#123860",
                borderRadius: 20,
                display:isTaskDone(tabsData[tabIndex])?'block':'none'
              }}
              onClick={()=>handleNextTab(tab.task_number+1)}
            >
              Go to next Task
            </Button>
          )}
          </Box>
        </TabPanel>
      ))}
    </Box>
  );
}
