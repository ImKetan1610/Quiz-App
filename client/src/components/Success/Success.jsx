import React, { useState } from 'react';
import s from './Success.module.css';
import close from '../../assets/close.svg';
import Toast from '../Toast/Toast';

const SuccessCreateQuiz = ({ onClose }) => {
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div className={s.successContainer}>
      <h1 className={s.header}>Congrats your Quiz is Published!</h1>
      <div className={s.link}>your link is here</div>
      <button type='button' onClick={handleShowToast} className={s.sharebtn}>Share</button>
      <div className={s.close} onClick={onClose}>
        <img src={close} alt="Close" />
      </div>
      {showToast && <Toast message='Link Copied to Clipboard!' onClose={handleCloseToast} />}
    </div>
  );
};

export default SuccessCreateQuiz;
