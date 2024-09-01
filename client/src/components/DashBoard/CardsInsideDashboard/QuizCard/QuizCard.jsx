import React from 'react'
import s from "./QuizCard.module.css"
import { formatDate, formatNumber } from '../../../../utils/formateForDateAndNumber'
import eye from "../../../../assets/eye.svg"

const QuizCard = ({name, createdAt, views}) => {
  const trimmedQuizName = name.length > 10 
    ? name.slice(0, 7) + '...' 
    : name;
  return (
    <div className={s.container}>
      <div className={s.heading}>
        <h2>{trimmedQuizName}</h2>
        <div className={s.views}>
            <p>{formatNumber(views)}</p>
            <img src={eye} alt='eye icon' className={s.img} />
        </div>
      </div>
      <div className={s.createdAt}>
        Created on : {formatDate(createdAt)}
      </div>
    </div>
  )
}

export default QuizCard
