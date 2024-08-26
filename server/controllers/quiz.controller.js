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

// get all quiz
const getAllQuiz = async (req, res) => {
  try {
    const quizzes = await QuizModel.find();
    return res.status(200).json(quizzes);
  } catch (error) {
    return res.status(400).json({ error: error.message });
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
    let quiz = await Quiz.findById(id);

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

module.exports = { createQuiz, getAllQuiz, getQuizById, deleteQuiz };
