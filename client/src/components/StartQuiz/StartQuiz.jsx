import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../utils/constant";
import s from "./StartQuiz.module.css";
import OptionsGrid from "../OptionsGrid/OptionsGrid";
import QuizComplete from "../QuizComplete/QuizComplete";

function StartQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(10);
  const [score, setScore] = useState(0);
  const [quiz, setQuiz] = useState({
    questions: [],
    quizName: "",
    typeOfQuiz: "none",
  });
  const timerId = useRef(null);
  const params = useParams();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const selectOptions = (index) => {
    if (quiz.questions.length && quiz.questions[currentQuestionIndex]._id !== undefined) {
      setSelectedOptions((prev) => {
        const newOptions = [...prev];
        newOptions[currentQuestionIndex] = {
          ans: index,
          id: quiz.questions[currentQuestionIndex]._id || "id",
        };
        return newOptions;
      });
    }
  };

  const nextQuestion = async () => {
    if (quiz.questions[currentQuestionIndex]._id) {
      await incrementQuestionImpression(quiz.questions[currentQuestionIndex]._id);
    }
    clearInterval(timerId.current);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      await getResult();
      // console.log("Quiz Complete. Submit the answers.");
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const incrementQuestionImpression = async (id) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/quiz/questionImpression/${id}`);
      return res.status === 200;
    } catch (error) {
      console.error("Error incrementing question impression:", error);
      return false;
    }
  };

  const fetchQuiz = async (id) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/quiz/start/${id}`);
    if (res.status === 201) {
        setQuiz(res.data);
        setSelectedOptions(new Array(res.data.questions.length).fill(-1));
      } else {
        console.error("Failed to fetch the quiz");
      }
    } catch (error) {
      console.error("Error fetching the quiz:", error);
    }
  };

  const getResult = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/quiz/getResult`, {
        answers: selectedOptions,
        typeOfQuiz: quiz.typeOfQuiz,
      });
      if (res.status === 200) {
        setScore(res.data.score);
      } else {
        console.log("Failed to get score");
      }
    } catch (error) {
      console.error("Error getting result:", error);
    }
  };

  useEffect(() => {
    if (quiz.questions.length && quiz.questions[currentQuestionIndex]) {
      clearInterval(timerId.current);

      const currentTimer = quiz.questions[currentQuestionIndex].timer;
      setTimer(currentTimer);

      if (currentTimer !== 0) {
        timerId.current = setInterval(() => {
          setTimer((prev) => {
            if (prev > 1) {
              return prev - 1;
            } else {
              nextQuestion();
              return 0;
            }
          });
        }, 1000);
      }
    }

    return () => clearInterval(timerId.current);
  }, [currentQuestionIndex, quiz.questions]);

  useEffect(() => {
    if (params.quidId) {
      fetchQuiz(params.quidId);
    }
  }, [params.quidId]);

  return (
    <div className={s.container}>
      <div className={s.innerContainer}>
        {currentQuestionIndex < quiz.questions.length ? (
          <>
            <header className={s.headers}>
              <div>
                {currentQuestionIndex + 1}/{quiz.questions.length}
              </div>
              {quiz.typeOfQuiz !== "POLL" && quiz.questions[currentQuestionIndex].timer !== 0 && (
                <div className={s.timer}>
                  00:{String(timer).padStart(2, "0")}s
                </div>
              )}
            </header>
            <div className={s.question}>
              {quiz.questions[currentQuestionIndex].question}
            </div>
            <div className={s.options}>
              <OptionsGrid
                selectOptions={selectOptions}
                content={quiz.questions[currentQuestionIndex].options}
              />
            </div>
            <div className={s.btnGroup}>
              <button
                disabled={selectedOptions[currentQuestionIndex] === -1}
                className={s.nextBtn}
                onClick={nextQuestion}
              >
                {currentQuestionIndex === quiz.questions.length - 1
                  ? "Complete"
                  : "Next"}
              </button>
            </div>
          </>
        ) : (
          quiz.typeOfQuiz !== "none" && (
            <QuizComplete
              total={quiz.questions.length}
              type={quiz.typeOfQuiz}
              score={score}
            />
          )
        )}
      </div>
    </div>
  );
}

export default StartQuiz;
