const UserModel = require("../models/User.model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  // console.log(req.body);
  const { name, email, password } = req.body;
  let existedUser = await UserModel.findOne({ email });
  if (existedUser)
    return res
      .status(409)
      .send({
        message: "User is already exist in the system, Please try login.",
      });

  try {
    const user = await UserModel.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await UserModel.findOne({ email });
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
