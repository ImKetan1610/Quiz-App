import React, { useEffect, useState } from "react";
import s from "./DashBoard.module.css";
import TrendingQuiz from "./CardsInsideDashboard/TrendingQuiz/TrendingQuiz";
import QuizCard from "./CardsInsideDashboard/QuizCard/QuizCard";
import customHooks from "../../customHooks/customHooks";

const DashBoard = () => {
  let { getMyStats, getTrendingQuiz } = customHooks();
  let [titles, setTitles] = useState([
    {
      number: 0,
      title: "Quiz",
      color: "#FF5D01",
    },
    {
      number: 0,
      title: "Questions",
      color: "#60B84B",
    },
    {
      number: 0,
      title: "Impression",
      color: "#5076FF",
    },
  ]);
  let [quizzes, setQuizzes] = useState([]);

  async function getAndSetStats() {
    let data = await getMyStats();
    let quiz = await getTrendingQuiz();
    setTitles((prev) => {
      let newTitle = [...prev];
      newTitle[0].number = data.quizCreated;
      newTitle[1].number = data.totalQuestions;
      newTitle[2].number = data.totalImpressions;
      return newTitle;
    });
    setQuizzes(()=>quiz);
  }

  useEffect(() => {
    getAndSetStats();
    // console.log(quizzes);
  }, []);

  return (
    <div className={s.container}>
      <div className={s.cardContainer}>
        {titles?.map((ele, i) => (
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
          {quizzes?.map((ele) => (
            <QuizCard
              key={ele._id}
              views={ele.impressions}
              createdAt={ele.createdAt}
              name={ele.quizName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
