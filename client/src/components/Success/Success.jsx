import React, { useState } from "react";
import s from "./Success.module.css";
import close from "../../assets/close.svg";
import Toast from "../Toast/Toast";

const SuccessCreateQuiz = ({ onClose }) => {
  const [showToast, setShowToast] = useState(false);
  const URL = window.location.origin;
  const handleShowToast = () => {
    const linkText = document.querySelector(`.${s.link}`).textContent;
    // console.log("hey this is url", window.location.origin);
    navigator.clipboard
      .writeText(linkText)
      .then(() => {
        setShowToast(true);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  let id = localStorage.getItem("recent-created-quiz-id");

  return (
    <div className={s.successContainer}>
      <h1 className={s.header}>Congrats your Quiz is Published!</h1>
      <div className={s.link}>
        {URL}/startQuiz/{id}
      </div>
      <button type="button" onClick={handleShowToast} className={s.sharebtn}>
        Share
      </button>
      <div className={s.close} onClick={onClose}>
        <img src={close} alt="Close" />
      </div>
      {showToast && (
        <Toast message="Link Copied to Clipboard!" onClose={handleCloseToast} />
      )}
    </div>
  );
};

export default SuccessCreateQuiz;
