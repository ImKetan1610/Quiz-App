import styles from "../QuestionAnswerForm/QuestionAnswerForm.module.css";

function QuestionTypeSelector({ selectedOptionType, setOptionType }) {
  return (
    <div className={styles.optionType}>
      <label>Question Type</label>
      <label>
        <input
          required
          type="radio"
          className={styles.radioInput}
          onChange={() => setOptionType("Text")}
          checked={selectedOptionType === "Text"}
          value={"Text"}
          name="type"
        />
        Text
      </label>
      <label>
        <input
          required
          type="radio"
          className={styles.radioInput}
          onChange={() => setOptionType("ImageUrl")}
          checked={selectedOptionType === "ImageUrl"}
          value={"ImageUrl"}
          name="type"
        />
        Image URL
      </label>
      <label>
        <input
          required
          type="radio"
          className={styles.radioInput}
          onChange={() => setOptionType("TextImageUrl")}
          checked={selectedOptionType === "TextImageUrl"}
          value={"TextImageUrl"}
          name="type"
        />
        Text & Image URL
      </label>
    </div>
  );
}

export default QuestionTypeSelector;
