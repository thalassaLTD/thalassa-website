import { Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material/";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Question.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Result from "../Result/Result";
import axios from "axios";
import { AuthContext } from '../../../Auth/Auth';
import { createUseStyles } from "react-jss";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TaskCompletedComponent from "../TaskCompletedComponent";
import { BorderLinearProgress } from "../../../commonComponents/ProgressBar";

const baseURL = "https://api.joinuplyft.com";

const useStyles = createUseStyles({
  bar: {
      // background: "#fff",
      height: "10%",
      color: "#123860",
      display: "flex",
      alignItems: "center",
      width:'100%',
      justifyContent:'space-between'
    },
})

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
  projectId,
  fetchStudentTracking
}) => {
  const classes = useStyles()
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)

  const history = useNavigate();

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };

  const handleNext = () => {
    console.log("handleNext, currQues", questions.length, currQues)
    if (currQues == questions.length - 1) {
      setShowResult(true)
      // history("/result");

      // fetchStudentTracking()
      // return (<Result
      //   score={score}
      // />)
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else setError("Please select an option first");
  };

  useEffect(() => {
    if(showResult){
      setLoading(true)
    axios
      .post(baseURL + "/updateQuizScore", {
        project_id: projectId,
        student_id: currentUser.uid,
        quiz_score: score
      })
      .then((response) => {
        console.log("response.data", response.data)
        fetchStudentTracking()
        setLoading(false)
      });
    }

  }, [showResult])

  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
  };


  if (showResult) {
    return <TaskCompletedComponent score={score} />;
    
  }
  return <>

    <div className="question">
    {loading  && <CircularProgress
            style={{ margin: 100 }}
            color="inherit"
            size={150}
            thickness={1}
          />}
      {
      !loading && <>
      <Box className="singleQuestion">
      <Typography variant="subtitle-1" mr={'auto'}>Question <b>{currQues + 1}</b> of <b>{questions.length}</b> </Typography>
      <BorderLinearProgress variant="determinate" value={(currQues + 1)*100/questions.length} />
        <Box className={classes.bar} sx={{py:3}}>
          <Typography variant="h5">{questions[currQues].question}</Typography> 
          <Typography variant="subtitle-1">Score: <b>{score}</b></Typography> 
        </Box>
          
        <Grid container spacing={3} className="options">
          {error && <Grid item xs={12}><ErrorMessage>{error}</ErrorMessage></Grid>}
          {options &&
            options.map((i) => (
              <Grid item xs={12} xl={6}>
              <button
                className={`singleOption  ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
              >
                {i}
              </button>
              </Grid>
            ))}
        </Grid>
        <Box sx={{width:'100%',textAlign:'center',pt:2}}>
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
          
            onClick={handleNext}
          >
            {currQues == questions.length - 1 ? "Submit" : <Typography >Next Question </Typography>}
          </Button>
        </Box>
        {/* <div className="controls">
          
        </div> */}
      </Box>
      </>}
    </div>
  </>
};

export default Question;
