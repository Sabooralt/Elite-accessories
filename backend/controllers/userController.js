const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "15d" });
};


const getUsers = async (req,res)=>{

  const user = await User.find({}).sort({ createdAt: -1 });
  
  res.status(201).json(user);
}
//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({_id: user._id, email: user.email,fullName: user.fullName, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const signupUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const user = await User.signup(fullName, email, password);

    const token = createToken(user._id);

    res.status(200).json({ fullName, email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { loginUser, signupUser,getUsers };
