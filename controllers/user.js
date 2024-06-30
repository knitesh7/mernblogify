const userHandler = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

const signincontroller = async (req, res) => {
  try {
    const user = await userHandler.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ valid: false, msg: "Invalid email" });
    const matched = await bcrypt.compare(req.body.pass, user.pass);
    if (!matched)
      return res.status(400).json({ valid: false, msg: "Invalid password" });
    const token = jwt.sign({ _id: user._id }, SECRET_KEY);
    return res.status(201).json({ status: true, user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ valid: false, msg: error.message });
  }
};
const signupcontroller = async (req, res) => {
  const { pass } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(pass, salt);
  try {
    const user = await userHandler.create({ ...req.body, pass: hashPass });
    const token = jwt.sign({ _id: user._id }, SECRET_KEY);
    return res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ valid: false, msg: error.message });
  }
};

const userfetcher = async (req, res) => {
  const user = await userHandler.findById(req.user._id);
  return res.status(202).json({ user });
};

module.exports = {
  signincontroller,
  signupcontroller,
  userfetcher
};
