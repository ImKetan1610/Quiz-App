import React, { useEffect, useRef, useState } from 'react';
import s from './Toast.module.css';
import tick from '../../assets/tick.svg';

const Toast = ({ message, duration = 3000, onClose }) => {
  const timeoutId = useRef(null);
  const intervalId = useRef(null);
  const [val, setValue] = useState(duration);

  useEffect(() => {
    timeoutId.current = setTimeout(() => {
      onClose();
    }, duration);

    intervalId.current = setInterval(() => {
      setValue(prev => Math.max(prev - 50, 0)); // Decrease by 50ms intervals
    }, 50);

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [duration, onClose]);

  const progressBarWidth = (val / duration) * 100;

  return (
    <div className={s.toast}>
      <div className={s.toastInnerContainer}>
        <div className={s.toastIcon}>
          <img src={tick} alt="Success" />
        </div>
        <div className={s.toastMessage}>{message}</div>
        <div className={s.toastClose} onClick={onClose}>&times;</div>
      </div>
      <div className={s.progressBarContainer}>
        <div className={s.progressBar} style={{ width: `${progressBarWidth}%` }} />
      </div>
    </div>
  );
};

export default Toast;
