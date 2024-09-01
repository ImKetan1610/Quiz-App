import s from "../QuestionAnswerForm/QuestionAnswerForm.module.css"

function ButtonGroup({ state, onClose }) {
  return (
    <div className={s.btnGroup}>
      <button onClick={onClose} className={s.cancel}>
        Cancel
      </button>
      <button className={s.addQuestion}>{state}</button>
    </div>
  );
}

export default ButtonGroup;
