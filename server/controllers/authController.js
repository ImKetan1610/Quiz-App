const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const login = async (req, res) => {};

module.exports = { register, login };
