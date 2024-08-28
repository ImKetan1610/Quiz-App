import React from "react";
import s from "./TrendingQuiz.module.css";
import { formatNumber } from "../../../../utils/formateForDateAndNumber";

const TrendingQuiz = ({ number, title, color }) => {
  return (
    <div className={s.container} style={{ color: color }}>
      <h1 className={s.title}>{formatNumber(number)}</h1>
      <div className={s.subTitle}>{title}</div>
      <div className={s.subTitle}>Created</div>
    </div>
  );
};

export default TrendingQuiz;
