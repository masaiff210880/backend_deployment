const express = require("express");
const { UserModel } = require("../Models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

// Create User
userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, gender, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(200).send({ msg: "User Already Registered!!" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const user = await UserModel({ name, email, gender, password: hash });
        await user.save();
        res.status(200).send({ msg: "New User Registered!!" });
      });
    }
  } catch (error) {
    req.status(400).send({ error: error.message });
  }
});
// User Login
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user._id },process.env.SECRET_KEY);
          res.status(200).send({ msg: "Login Successful!!", token: token });
        } else {
          res.status(400).send({ msg: "Wrong Credentials!!" });
        }
      });
    }
  } catch (error) {
    req.status(400).send({ error: error.message });
  }
});

module.exports = { userRouter };
