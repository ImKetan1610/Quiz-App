import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

const Modal = ({ show, onClose, children }) => {
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target;
      if (target.classList.contains("modal") && show) {
        onClose();
      }
    };

    document.addEventListener("click", handleClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [show, onClose]);

  const modalRoot = document.getElementById("modal");
  if (!modalRoot) return null;

  if (!show) {
    return null;
  }

  return createPortal(
    <div className={`modal ${s.modalContainer}`}>
      <div className={s.content}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
