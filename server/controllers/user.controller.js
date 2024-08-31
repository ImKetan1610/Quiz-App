const UserModel = require("../models/User.model");

const getMyQuizStats = async (req, res) => {
  try {
    let id = req.user._id;
    let userInfo = await UserModel.findById(id)
      .populate("quizzes")
      .populate("questions");

    let totalQuestions = 0;
    let totalImpressions = 0;

    for (let ques of userInfo.quizzes) {
      totalQuestions += ques.questions.length;
      totalImpressions += ques.impressions;
    }

    let data = {
      quizCreated: userInfo.quizzes.length,
      totalQuestions,
      totalImpressions,
    };

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTrendingQuiz = async (req, res) => {
  try {
    let id = req.user._id;
    let allQuiz = await UserModel.findById(id)
      .populate({
        path: "quizzes",
        // filter quizzes on the basis of impression (greater than 10)
        // match: { impression: { $gt: 10 } },
        // Sorts by ascending order on the time of creation
        options: { sort: { createdAt: 1 } },
      })
      .select("name impression createdAt");

    return res.status(201).json(allQuiz);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getMyQuizzes = async (req, res) => {
  try {
    let id = req.user._id;
    let allQuiz = await UserModel.findById(id)
      .populate({
        path: "quizzes",
        // Select impression, name, and createdAt fields
        select: "impressions quizName createdAt",
      })
      .select("quizzes");

    return res.status(200).json(allQuiz);
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: error });
  }
};

module.exports = { getMyQuizStats, getTrendingQuiz, getMyQuizzes };
