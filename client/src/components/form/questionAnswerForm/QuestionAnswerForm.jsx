import { useState } from "react";
import s from "./QuestionAnswerForm.module.css";
import QuestionList from "../QuestionList/QuestionList";
import QuestionTypeSelector from "../QuestionTypeSelector/QuestionTypeSelector";
import OptionsContainer from "../OptionsContainer/OptionsContainer";
import TimerSelector from "../TimerSelector/TimerSelector";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import customHooks from "../../../customHooks/customHooks";
import { validateQuiz } from "../../../utils/validation";

function QuestionAnswerForm({
  showSuccessModal,
  quizType,
  quizName,
  onClose,
  questions,
  setQuestions,
  state,
  id,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { createQuizzes, updateQuestions } = customHooks();
  const [validation,setValidation] = useState('')

  function setIndex(i) {
    setSelectedIndex(i);
  }

  async function submitHandler(e) {
    e.preventDefault();
    let data = {
      quizName: quizName,
      typeOfQuiz: quizType,
      questions: questions,
    };
    let isValid = validateQuiz(data);
    if (isValid != "valid") {
      setValidation((_) => isValid);
      return;
    }
    if (state === "CREATE") {
      await createQuizzes(data);
    } else {
      await updateQuestions(data.questions, id);
    }
    onClose();
    showSuccessModal();
  }

  function saveAndAddQuestionHandler(e) {
    e.preventDefault();
    setQuestions((prev) => [
      ...prev,
      {
        question: "",
        optionType: questions[selectedIndex].optionType,
        options: [],
        answer: 0,
        timer: 0,
      },
    ]);
    setSelectedIndex(questions.length);
  }

  function setTimer(timer) {
    setQuestions((prev) => {
      let newQuestions = [...prev];
      newQuestions[selectedIndex].timer = timer;
      return newQuestions;
    });
  }

  function setOptionType(str) {
    setQuestions((prev) => {
      let newQuestions = [...prev];
      newQuestions[selectedIndex].optionType = str;
      return newQuestions;
    });
  }

  function deleteQuestion(index) {
    setQuestions((prev) => {
      if (index < 0 || index >= prev.length) {
        console.error("Index out of bounds");
        return prev;
      }
      let newQuestions = [...prev];
      newQuestions.splice(index, 1);
      return newQuestions;
    });
  }

  function selectCorrectOption(i) {
    if (state === "CREATE") {
      setQuestions((prev) => {
        let allQuestions = [...prev];
        allQuestions[selectedIndex].answer = i;
        return allQuestions;
      });
    }
  }

  return (
    <form className={s.container} onSubmit={submitHandler}>
      <QuestionList
        state={state}
        questions={questions}
        selectedIndex={selectedIndex}
        setSelectedIndex={setIndex}
        saveAndAddQuestionHandler={saveAndAddQuestionHandler}
        deleteQuestion={deleteQuestion}
      />
      <input
        required
        type="text"
        className={s.pollInput}
        placeholder="Poll Question"
        value={questions[selectedIndex]?.question}
        onChange={(e) =>
          setQuestions((prev) => {
            let newQuestions = [...prev];
            newQuestions[selectedIndex].question = e.target.value;
            return newQuestions;
          })
        }
      />

      {state !== "UPDATE" && (
        <QuestionTypeSelector
          selectedOptionType={questions[selectedIndex]?.optionType}
          setOptionType={setOptionType}
        />
      )}
      <div className={s.optionsContainer}>
        <OptionsContainer
          state={state}
          quizType={quizType}
          options={questions[selectedIndex]?.options}
          optionType={questions[selectedIndex]?.optionType}
          correctAnswer={questions[selectedIndex]?.answer}
          addOption={() =>
            setQuestions((prev) => {
              let newQuestions = [...prev];
              newQuestions[selectedIndex].options.push({
                ImageUrl: "",
                text: "",
              });
              return newQuestions;
            })
          }
          deleteOption={(i) =>
            setQuestions((prev) => {
              let newQuestions = [...prev];
              newQuestions[selectedIndex].options.splice(i, 1);
              return newQuestions;
            })
          }
          appendText={(e, i) =>
            setQuestions((prev) => {
              let newQuestions = [...prev];
              newQuestions[selectedIndex].options[i].text = e.target.value;
              return newQuestions;
            })
          }
          appendImageUrl={(e, i) =>
            setQuestions((prev) => {
              let newQuestions = [...prev];
              newQuestions[selectedIndex].options[i].ImageUrl = e.target.value;
              return newQuestions;
            })
          }
          selectCorrectOption={selectCorrectOption}
        />
        {quizType === "QnA" && (
          <TimerSelector
            selectedTimer={questions[selectedIndex]?.timer}
            setTimer={setTimer}
          />
        )}
      </div>
      <ButtonGroup state={state} onClose={onClose} />
      <h5 className={s.validation}>{validation}</h5>
    </form>
  );
};

export default QuestionAnswerForm;
