import s from "../QuestionAnswerForm/QuestionAnswerForm.module.css";
import add from "../../../assets/add.svg";
import close from "../../../assets/close.svg";

function QuestionList({
  questions,
  selectedIndex,
  setSelectedIndex,
  saveAndAddQuestionHandler,
  deleteQuestion,
  state,
}) {
  return (
    <div className={s.allQuestions}>
      <div className={s.pileContainer}>
        {questions.map((_, i) => (
          <span
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={
              selectedIndex === i
                ? `${s.border} ${s.questionNum}`
                : `${i !== 0 && s.questionNum}`
            }
          >
            {i !== 0 && state === "CREATE" && (
              <img
                src={close}
                alt="Delete"
                onClick={() => deleteQuestion(i)}
                className={s.close}
              />
            )}
            {i + 1}
          </span>
        ))}
        {questions.length < 5 && state === "CREATE" && (
          <button
            type="button"
            onClick={saveAndAddQuestionHandler}
            className={s.addQuiz}
          >
            <img src={add} alt="Add" />
          </button>
        )}
      </div>
      <h3>Max 5 Questions</h3>
    </div>
  );
}

export default QuestionList;
