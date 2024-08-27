const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const {
  createQuiz,
  getQuizById,
  deleteQuiz,
} = require("../controllers/quiz.controller");
const {
  getQuestion,
  updateQuestion,
} = require("../controllers/question.controller");
const {
  takeQuiz,
  questionImpression,
  getResult,
} = require("../controllers/quizInterface.controller");
const router = express.Router();

// routes for quizzes
router.post("/", protect, createQuiz);
router.get("/:id", protect, getQuizById);
router.delete("/:id", protect, deleteQuiz);

// routes for the questions of the quiz that we need to make the changes
router.get("/questions/:id", protect, getQuestion);
router.put("/questions/:id", protect, updateQuestion);

// routes for taking the quiz
router.get("/start/:id", takeQuiz);
router.get("/questionImpression/:id", questionImpression);
router.post("/getResult", getResult);

module.exports = router;
