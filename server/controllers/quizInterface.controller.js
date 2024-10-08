const QuestionModel = require("../models/Question.model");
const QuizModel = require("../models/Quiz.model");

const takeQuiz = async (req, res) => {
  try {
    const id = req.params.id;
    let quiz = await QuizModel.findById(id)
      .populate({
        path: "questions",
        select: "optionType question options timer",
      })
      .select("quizName typeOfQuiz questions impressions");

    if (!quiz) return res.status(404).json({ message: "Quiz is not found." });

    quiz.impressions += 1;
    await quiz.save();

    return res.status(201).json(quiz);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const questionImpression = async (req, res) => {
  try {
    const id = req.params.id;
    let que = await QuestionModel.findByIdAndUpdate(
      id,
      { $inc: { impression: 1 } },
      { new: true }
    );

    if (!que) {
      return res.status(404).json({ message: "Quiz is not found." });
    }

    return res
      .status(200)
      .json({ message: "Increased impression successfully", que });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const getResult = async (req, res) => {
  try {
    let { answers, typeOfQuiz } = req.body;
    let score = 0;

    for (let ans of answers) {
      let question = await QuestionModel.findById(ans.id);
      if (typeOfQuiz == "QnA" && question.answer == ans.ans) {
        question.correctImpression += 1;
        score++;
      } else if (typeOfQuiz == "POLL") {
        if (!question.poll[ans.ans]) {
          question.poll[ans.ans] = 1;
        } else {
          question.poll[ans.ans] += 1;
        }
      }
      await question.save();
    }

    return res.status(200).json({ score });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = { takeQuiz, questionImpression, getResult };
