import { useRef, useState } from 'react';
import s from './QuizTypeForm.module.css';

function QuizTypeForm({ onClose, setNameType }) {
  const nameRef = useRef(null);
  const [select, setSelect] = useState("none");

  function submitHandler(e) {
    e.preventDefault();
    if (nameRef.current && nameRef.current.value && select !== 'none') {
      const data = { quizName: nameRef.current.value, typeOfQuiz: select };
      setNameType(data);
    }
  }

  return (
    <form className={s.formContainer} onSubmit={submitHandler}>
      <div>
        <input
          className={s.quizNameInput}
          ref={nameRef}
          required
          type="text"
          placeholder="Quiz Name"
        />
      </div>
      <div className={s.radioGroup}>
        <label>Quiz Type</label>
        <label className={select === 'QnA' ? `${s.radioLabel} ${s.active}` : `${s.radioLabel}`}>
          Q&A
          <input
            className={s.inputRadio}
            onClick={() => setSelect("QnA")}
            required
            type="radio"
            name="quizType"
          />
        </label>
        <label className={select === 'POLL' ? `${s.radioLabel} ${s.active}` : `${s.radioLabel}`}>
          Poll Type
          <input
            className={s.inputRadio}
            onClick={() => setSelect("POLL")}
            required
            type="radio"
            name="quizType"
          />
        </label>
      </div>
      <div className={s.buttonContainer}>
        <button className={s.btn} type="button" onClick={onClose}>Cancel</button>
        <button className={`${s.btn} ${s.active}`}>Continue</button>
      </div>
    </form>
  );
}

export default QuizTypeForm;
