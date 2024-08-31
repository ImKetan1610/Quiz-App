import React, { useEffect, useState } from "react";
import s from "./QuizTable.module.css";
import QuizRow from "./QuizRow/QuizRow";
import { formatDate } from "../../../utils/formateForDateAndNumber";
import customHooks from "../../../customHooks/customHooks";
import Modal from "../../Modal/Modal";
import ConfirmDeleteModal from "../../Modal/ConfirmDeleteModal/ConfirmDeleteModal";
import QuestionAnswerForm from "../../form/questionAnswerForm/questionAnswerForm";

const QuizTable = () => {
  let [quizzes, setQuizzes] = useState([]);
  let [questions, setQuestions] = useState([]);
  let [selectedId, setSelectedId] = useState(null);
  let [showDelete, setShowDelete] = useState(false);
  let [showUpdate, setShowUpdate] = useState(false);
  let [editQuizType, setEditQuizType] = useState("QnA");
  const { getQuestion, getMyQuizzes, deleteQuiz } = customHooks();

  function onClose() {
    setShowDelete(false);
    setSelectedId(null);
  }

  function closeUpdateModal() {
    setShowUpdate(false);
    setSelectedId(null);
  }

  async function getAndSetQuestion(id) {
    const data = await getQuestion(id);
    if (data) {
      setQuestions(data.questions);
      setShowUpdate(true);
      setEditQuizType(data.typeOfQuiz);
    }
  }

  async function openUpdateModal(id) {
    // console.log("edit click");
    setSelectedId(id);
    await getAndSetQuestion(id);
  }

  function show(id) {
    setShowDelete(true);
    setSelectedId(id);
  }

  async function deleteQuizHandler() {
    if (selectedId != null) {
      const res = await deleteQuiz(selectedId);
      onClose();
      if (res) {
        setQuizzes((prev) => prev.filter((ele) => ele._id !== selectedId));
        setSelectedId(null);
      }
    }
  }

  async function getAndSetQuizzes() {
    const data = await getMyQuizzes();
    // console.log("data",data)
    setQuizzes(data);
  }

  useEffect(() => {
    getAndSetQuizzes();
    // console.log("67",quizzes)
  }, []);

  return (
    <>
      <div className={s.container}>
        <table className={s.table}>
          <tr className={s.heading}>
            <th className={s.srNo}>Sr. No.</th>
            <th>Quiz Name</th>
            <th>Created On</th>
            <th>Impression</th>
            <th></th>
            <th className={s.end}></th>
          </tr>
          {quizzes?.map((ele, i) => (
            <QuizRow
              key={i}
              showDelete={show}
              num={i + 1}
              createdOn={formatDate(ele.createdAt)}
              impressions={ele.impressions}
              id={ele._id}
              quizName={ele.quizName}
              openUpdate={openUpdateModal}
            />
          ))}
        </table>
        {showUpdate && selectedId && (
          <Modal onClose={closeUpdateModal} show={showUpdate}>
            <QuestionAnswerForm
              id={selectedId}
              onClose={closeUpdateModal}
              quizName=""
              quizType={editQuizType}
              showSuccessModal={() => {}}
              questions={questions}
              setQuestions={setQuestions}
              state="UPDATE"
            />
          </Modal>
        )}
        {showDelete && (
          <Modal onClose={onClose} show={showDelete}>
            <ConfirmDeleteModal
              quizDelete={deleteQuizHandler}
              cancel={onClose}
            />
          </Modal>
        )}
      </div>
      {quizzes?.length > 10 && <p>scroll down for more</p>}
    </>
  );
};

export default QuizTable;
