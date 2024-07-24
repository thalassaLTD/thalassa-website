import { CircularProgress, Box, Typography } from "@mui/material/";
import React, { useState, useEffect, useContext } from "react";
import Question from "./Question/Question";
import TaskCompletedComponent from "./TaskCompletedComponent";
import "./Quiz.css";
import axios from "axios";
const baseURL = "https://api.joinuplyft.com";

const Quiz = ({ projectId, fetchStudentTracking, studentTaskData }) => {
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(0);


  useEffect(() => {
    axios
      .post(baseURL + "/getQuizQuestions", {
        project_id: projectId,
      })
      .then((response) => {
        setQuestions(response.data);
      });
  }, [projectId]);

  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    if (questions?.length > 0) {
      setOptions(
        questions &&
          handleShuffle([
            questions[currQues]?.correct_answer,
            ...questions[currQues]?.incorrect_answers,
          ])
      );
    }
  }, [currQues, questions]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <>
      {studentTaskData?.quiz_score && studentTaskData.quiz_score>=0 && (
        <TaskCompletedComponent score={studentTaskData?.quiz_score} totalQuestions={questions && questions.length}/>
      )}
      {questions?.length === 0 && (
        <Box sx={{ pb: 10, textAlign: "start" }}>
          <Typography variant="h5">Quiz not available</Typography>
        </Box>
      )}

      <Box className="quiz">
        {/* <span className="subtitle">Welcome, R</span> */}

        {questions?.length > 0 ? (
          studentTaskData?.quiz_score==null && (
            <>
              {/* <div className="quizInfo"> */}
              {/* <span>{questions[currQues]?.category}</span> */}
              {/* <span>
              Total Questions : {questions?.length}
            </span>
            <span>
              Score : {score}
            </span>
          </div> */}
              <Question
                currQues={currQues}
                setCurrQues={setCurrQues}
                questions={questions}
                options={options}
                correct={questions?.[currQues]?.correct_answer}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
                projectId={projectId}
                fetchStudentTracking={fetchStudentTracking}
              />
            </>
          )
        ) : (
          <CircularProgress
            style={{ margin: 100 }}
            color="inherit"
            size={150}
            thickness={1}
          />
        )}
      </Box>
    </>
  );
};

export default Quiz;
