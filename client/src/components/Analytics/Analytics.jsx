import React from "react";
import s from "./Analytics.module.css";
import QuizTable from "./QuizTable/QuizTable";

const Analytics = () => {
  return (
    <div className={s.container}>
      <h1 className={s.heading}>Quiz Analysis</h1>
      <div className={s.table}>
        <QuizTable />
      </div>
    </div>
  );
};

export default Analytics;
