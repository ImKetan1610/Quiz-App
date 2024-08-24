const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  // console.log(req.body);
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

const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ error: "Invalid Credentials" });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).send({ error: "Invalid Credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.status(200).send({
    user,
    token,
  });
};

module.exports = { register, login };
