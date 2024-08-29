import React from "react";
import trophy from "../../assets/trophy.svg";
import s from "./QuizComplete.module.css";

const QuizComplete = ({ score, total, type }) => {
  return (
    <>
      {type === "QnA" ? (
        <div>
          <h2>Congrats, the Quiz is completed</h2>
          <div>
            <img src={trophy} alt="Trophy" />
          </div>
          <div>
            Your Score is{" "}
            <span className={s.score}>
              {score}/{total}
            </span>
          </div>
        </div>
      ) : (
        <h1 className={s.message}>
          Thank you for participating in the Poll
        </h1>
      )}
    </>
  );
};

export default QuizComplete;
