import { useParams } from "react-router-dom";
import s from "./QuizAnalytics.module.css";
import QuestionAnalytics from "../QuestionAnalytics/QuestionAnalytics";
import customHooks from "../../../customHooks/customHooks";
import { useEffect, useState } from "react";
import { formatDate } from "../../../utils/formateForDateAndNumber";

function QuizAnalytics() {
  let params = useParams();
  let [quiz, setQuiz] = useState(null); // Adjusted initial state to `null`
  let { getQuizDetail } = customHooks();

  // console.log(params);

  async function getAndSetQuiz() {
    if (!params.quizId) return;
    let data = await getQuizDetail(params.quizId);
    setQuiz(data);
  }

  useEffect(() => {
    getAndSetQuiz();
  }, []);

  return (
    <div className={s.container}>
      <header className={s.header}>
        <h1>{quiz?.quizName} Question Analysis</h1>
        <div>
          <p>Created on : {quiz && formatDate(quiz?.createdAt)}</p>
          <p>Impressions : {quiz?.impressions}</p>
        </div>
      </header>
      {quiz?.questions.map((ele, i) => (
        <QuestionAnalytics
          key={ele._id}
          No={i + 1}
          _id={ele._id}
          correctImpression={ele.correctImpression}
          impression={ele.impression}
          question={ele.question}
          poll={ele.poll}
          quizType={quiz.typeOfQuiz}
        />
      ))}
    </div>
  );
}

export default QuizAnalytics;
