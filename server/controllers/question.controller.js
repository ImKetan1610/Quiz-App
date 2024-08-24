const QuestionModel = require("../models/Question.model");
const QuizModel = require("../models/Quiz.model");

const getQuestion = async (req, res) => {
  try {
    let id = req.params.id;
    let getQuiz = await QuizModel.findById(id).populate({
      path: "questions",
      select: "optionType question options answer timer",
    });
    if (!getQuiz) {
      return res
        .status(404)
        .send({ message: "Quiz is not available with this id!" });
    }
    if (getQuiz.createdBy != req.User._id) {
      return res.status(401).send({ message: "Unauthorize access..!" });
    }

    return res.status(200).json(getQuiz);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    let ques = req.body.questions;

    let quiz = await QuizModel.findById(id);

    if (!quiz)
      return res
        .status(404)
        .json({ message: "Quiz is not available with this id" });

    // check the loggedIn user has create the quiz or not
    if (quiz.createdBy != req.user._id)
      return res.status(401).json({ message: "Unauthorized Access." });

    // Check if all questions exist in the quiz
    for (let que of ques) {
      if (!quiz.questions.includes(que._id)) {
        return res.status(400).json({ message: "Unauthorized access" });
      }
    }

    // update each question individually
    for (let que of ques) {
      let updateQue = await QuestionModel.findByIdAndUpdate(
        que._id,
        { $set: que },
        { new: true }
      );

      if (!updateQue) {
        return res.status(500).json({ message: "Failed to update" });
      }
    }

    return res.status(201).json({ message: "Updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { updateQuestion, getQuestion };
