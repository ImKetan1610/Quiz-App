import React, { useState } from "react";
import s from "./DashBoard.module.css";
import TrendingQuiz from "./CardsInsideDashboard/TrendingQuiz/TrendingQuiz";
import QuizCard from "./CardsInsideDashboard/QuizCard/QuizCard";

const DashBoard = () => {
  let [titles, setTitles] = useState([
    {
      number: 0,
      title: "Quiz",
      color: "#FF5D01",
    },
    {
      number: 0,
      title: "Questions",
      color: "#FF5D01",
    },
    {
      number: 0,
      title: "Impression",
      color: "#FF5D01",
    },
  ]);
  let [quizzes, setQuizzes] = useState([]);

  return (
    <div className={s.container}>
      <div className={s.cardContainer}>
        {titles.map((ele, i) => (
          <TrendingQuiz
            key={i}
            number={ele.number}
            title={ele.title}
            color={ele.color}
          />
        ))}
      </div>
      <div className={s.trendingContainer}>
        <h1>Trending Quizzes</h1>
        <div className={s.trendingQuizzes}>
          {quizzes.map((ele) => (
            <QuizCard
              key={ele.quizname}
              views={ele.impression}
              createdAt={ele.createdAt}
              name={ele.quizname}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
