import ImpressionBox from "../ImpressionBox/ImpressionBox";
import s from "./QuestionAnalytics.module.css";

function QuestionAnalytics({
  No,
  _id,
  correctImpression,
  impression,
  poll,
  question,
  quizType,
}) {
  return (
    <div>
      <h2>
        Q.{No} {question}
      </h2>
      <div className={s.impressionContainer}>
        {quizType === "QnA" ? (
          <>
            <ImpressionBox impression={impression} text="people Attempted the Question" />
            <ImpressionBox impression={correctImpression} text="people Attempted correctly" />
            <ImpressionBox
              impression={impression - correctImpression}
              text="people Attempted Incorrectly"
            />
          </>
        ) : (
          <>
            {poll.map((ele, i) => (
              <ImpressionBox key={i} impression={ele} text={`Option ${i + 1}`} />
            ))}
          </>
        )}
      </div>
      <hr />
    </div>
  );
}

export default QuestionAnalytics;
