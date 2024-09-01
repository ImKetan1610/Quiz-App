import s from "../QuestionAnswerForm/QuestionAnswerForm.module.css";

function TimerSelector({ selectedTimer, setTimer }) {
  return (
    <div className={s.timerContainer}>
      <div>Timer</div>
      <label
        className={
          selectedTimer === 0
            ? `${s.timer} ${s.active}`
            : `${s.timer}`
        }
      >
        <input
          required
          onClick={() => setTimer(0)}
          className={s.inputRadio}
          type="radio"
        />
        OFF
      </label>
      <label
        className={
          selectedTimer === 5
            ? `${s.timer} ${s.active}`
            : `${s.timer}`
        }
      >
        <input
          required
          className={s.inputRadio}
          onClick={() => setTimer(5)}
          type="radio"
        />
        5 sec
      </label>
      <label
        className={
          selectedTimer === 10
            ? `${s.timer} ${s.active}`
            : `${s.timer}`
        }
      >
        <input
          required
          onClick={() => setTimer(10)}
          className={s.inputRadio}
          type="radio"
        />
        10 sec
      </label>
    </div>
  );
}

export default TimerSelector;
