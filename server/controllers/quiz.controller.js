const QuestionModel = require("../models/Question.model");
const QuizModel = require("../models/Quiz.model");

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
const getQuizById = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
const deleteQuiz = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = { createQuiz, getQuizById, deleteQuiz };
