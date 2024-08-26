const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const router = express.Router();
const {
  getMyQuizStats,
  getTrendingQuiz,
  getMyQuizzes,
} = require("../controllers/user.controller");

router.get("/getStats", protect, getMyQuizStats);
router.get("/getTrendingQuiz", protect, getTrendingQuiz);
router.get("/getMyQuizzes", protect, getMyQuizzes);

module.exports = router;
