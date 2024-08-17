const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const {
  registerValidation,
  validateRegister,
} = require("../validation/authValidation");

// Register Route
router.post("/register", registerValidation, validateRegister, register);
// Login Route
router.post("/login", login);

module.exports = router;
