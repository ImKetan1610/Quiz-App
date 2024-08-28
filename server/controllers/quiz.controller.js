const QuestionModel = require("../models/Question.model");
const QuizModel = require("../models/Quiz.model");
const UserModel = require("../models/User.model");

const createQuiz = async (req, res) => {
  try {
    let userId = req.User._id;
    const { quizName, typeOfQuiz, questions } = req.body;
    let arrayOfQuestion = [];

    const quiz = await QuizModel.create({
      quizName,
      typeOfQuiz,
      questions: arrayOfQuestion,
      createdBy: userId,
    });

    for (let que of questions) {
      que.quizId = quiz.id;
      if(quiz.typeOfQuiz == "POLL") {
        que.poll = new Array(que.options.length).fill(0)
      }
      let newQue = await QuestionModel.create(que);
      arrayOfQuestion.push(newQue.id);
    }

    quiz.questions = [...arrayOfQuestion];
    await quiz.save();

    await User.findByIdAndUpdate(userId, { $push: { quizzes: quiz.id } });

    return res.status(201).json(quiz);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const getQuizById = async (req, res) => {
  try {
    const id = req.params.id;
    const quiz = await QuizModel.findById(id).populate({
      path: "questions",
      select: "question poll impression correctImpression",
    });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (quiz.createdBy != req.user._id) {
      return res.status(400).json({ message: "Unauthorized access" });
    }

    return res.status(200).json(quiz);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const id = req.params.id;
    let quiz = await QuizModel.findById(id);

    if (!quiz) return res.status(404).json({ message: "Quiz is not found." });
    if (quiz.createdBy != req.user._id)
      return res.status(400).json({ message: "Unauthorized Access." });

    await QuizModel.findByIdAndDelete(id);

    await UserModel.findByIdAndUpdate(req.user._id, {
      $pull: { quizzes: id },
    });

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = { createQuiz, getQuizById, deleteQuiz };
