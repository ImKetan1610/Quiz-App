const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect);

module.exports = router;
