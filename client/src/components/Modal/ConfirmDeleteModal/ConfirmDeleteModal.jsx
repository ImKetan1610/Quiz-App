import React from 'react';
import s from "./ConfirmDeleteModal.module.css";

function ConfirmDeleteModal({ cancel, quizDelete }) {
  return (
    <div className={s.container}>
      <h1 className={s.header}>
        Are you sure you want to delete?
      </h1>
      <div className={s.btnGroup}>
        <button className={s.delete} onClick={quizDelete}>
          Delete
        </button>
        <button className={s.cancel} onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
