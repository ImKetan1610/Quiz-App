const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const { createQuiz, getQuizById, deleteQuiz } = require("../controllers/quiz.controller");
const router = express.Router();

router.post('/', protect, createQuiz);
router.get('/:id', protect, getQuizById);
router.delete('/:id', protect, deleteQuiz);

module.exports = router;
