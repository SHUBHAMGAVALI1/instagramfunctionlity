const UserModel = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// User registration
exports.userSignUp = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(200).send({
      msg: "Sign Up Success",
      data: newUser,
    });
  } catch (error) {
    res.status(501).send({ msg: error.message });
  }
};

// User login
exports.userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username }).select("+password");
    if (user && user.username) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '24h' });
        res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
       return res.status(200).json({
          success: true,
          data: user,
        });
      } else {
        res.status(404).send({ msg: "Password is incorrect, try again!" });
      }
    } else {
      res.status(404).send({ msg: "No account found associated with this username" });
    }
  } catch (error) {
    res.status(501).send({ msg: error.message });
  }
};

// Get user details
exports.getUserDetails = async (req, res) => {
  const { id } = req.user;

  try {
    const userData = await UserModel.findById(id);
    res.status(200).send({
      msg: "Success",
      data: userData,
    });
  } catch (error) {
    res.status(501).send({ msg: error.message });
  }
};
