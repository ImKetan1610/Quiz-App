const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const {
  registerValidation,
  loginValidation,
  validate,
} = require("../validation/authValidation");

// Register Route
router.post("/register", registerValidation, validate, register);
// Login Route
router.post("/login", loginValidation, validate, login);

module.exports = router;
