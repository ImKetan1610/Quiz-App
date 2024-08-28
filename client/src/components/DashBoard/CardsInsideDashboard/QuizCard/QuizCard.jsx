import React from 'react'
import s from "./QuizCard.module.css"
import { formatDate, formatNumber } from '../../../../utils/formateForDateAndNumber'

const QuizCard = ({name, createdAt, views}) => {
  return (
    <div className={s.container}>
      <div className={s.heading}>
        <h2>{name}</h2>
        <div className={s.views}>
            <p>{formatNumber(views)}</p>
            <img src='' alt='eye icon' className={s.img} />
        </div>
      </div>
      <div className={s.createdAt}>
        Created on : {formatDate(createdAt)}
      </div>
    </div>
  )
}

export default QuizCard
