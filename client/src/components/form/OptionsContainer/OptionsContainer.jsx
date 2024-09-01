import s from "../QuestionAnswerForm/QuestionAnswerForm.module.css"
import del from "../../../assets/deleteIcon.svg";

function OptionsContainer({
  quizType,
  options,
  optionType,
  correctAnswer,
  addOption,
  deleteOption,
  appendText,
  appendImageUrl,
  selectCorrectOption,
  state,
}) {
  return (
    <div className={s.optionsContainer}>
      <div className={s.options}>
        {options.map((ele, i) => (
          <div key={i} className={s.option}>
            {quizType === "QnA" && (
              <input
                required
                onChange={() => selectCorrectOption(i)}
                type="radio"
                checked={correctAnswer === i}
                name="option"
              />
            )}
            {optionType.includes("Text") && (
              <input
                required
                type="text"
                readOnly={state === "UPDATE" && quizType === "QnA" && correctAnswer === i}
                className={
                  quizType === "QnA" && correctAnswer === i
                    ? `${s.correctAnswer} ${s.optionInput}`
                    : `${s.optionInput}`
                }
                placeholder="Text"
                value={ele.text}
                onChange={(e) => appendText(e, i)}
              />
            )}
            {optionType.includes("ImageUrl") && (
              <input
                required
                type="url"
                readOnly={state === "UPDATE" && quizType === "QnA" && correctAnswer === i}
                className={
                  quizType === "QnA" && correctAnswer === i
                    ? `${s.correctAnswer} ${s.optionInput}`
                    : `${s.optionInput}`
                }
                placeholder="Image Url"
                onChange={(e) => appendImageUrl(e, i)}
                value={ele.ImageUrl}
              />
            )}
            {state === "CREATE" && (
              <img src={del} alt="Delete Option" onClick={() => deleteOption(i)} />
            )}
          </div>
        ))}
        {options.length < 4 && state === "CREATE" && (
          <div className={s.addOption} onClick={addOption}>
            <div> </div>
            <div>Add Option</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OptionsContainer;
