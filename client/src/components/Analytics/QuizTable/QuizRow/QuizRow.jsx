import React, { useState } from "react";
import s from "./QuizRow.module.css";
import { formatNumber } from "../../../../utils/formateForDateAndNumber";
import edit from "../../../../assets/edit.svg";
import del from "../../../../assets/deleteIcon.svg";
import shareSVG from "../../../../assets/share.svg";
import copiedSVG from "../../../../assets/tick.svg";
import { FRONTEND_URL } from "../../../../utils/constant";
import { Link } from "react-router-dom";
import Toast from "../Toast/Toast";

const CopyButton = ({ id, showToast }) => {
  const [copied, setCopied] = useState(false);
  const URL = window.location.origin;
  const handleCopyClick = async () => {
    if (!copied) {
      try {
        await navigator.clipboard.writeText(`${URL}/startQuiz/${id}`);
        setCopied(true);
        showToast();
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <img
      src={copied ? copiedSVG : shareSVG}
      onClick={handleCopyClick}
      alt="Copy to clipboard"
    />
  );
};

const QuizRow = ({
  createdOn,
  impressions,
  num,
  quizName,
  showDelete,
  id,
  openUpdate,
}) => {
  
  const [showToast, setShowToast] = useState(false);

  const handleEdit = () => {
    openUpdate(id);
  };

  const handleDelete = () => {
    showDelete(id);
  };

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <tr className={s.row}>
      <td className={s.start}>{num}</td>
      <td>{quizName}</td>
      <td>{createdOn}</td>
      <td>{formatNumber(impressions)}</td>
      <td className={s.img}>
        <img className={s.edit} src={edit} onClick={handleEdit} />
        <img className={s.edit} src={del} onClick={handleDelete} />
        <CopyButton showToast={handleShowToast} id={id} />
      </td>
      <td className={s.end}>
        <Link to={`quiz/${id}`} className={s.link}>
          Question Wise Analysis
        </Link>
      </td>
      {showToast && (
        <Toast message="Link copied to Clipboard" onClose={handleCloseToast} />
      )}
    </tr>
  );
};

export default QuizRow;
