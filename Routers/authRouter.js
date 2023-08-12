const express = require("express");

const authRouter = express.Router();

const userModal = require("../Models/userModel");

const getSignupPage = (req, res) => {
  console.log("Get sign up called");
  res.sendFile("/views/signuppage.html", { root: __dirname });
};

const postSignup = async (req, res) => {
  let Dataobj = req.body;
  let SignupData = await userModal.create(Dataobj);
  res.json({
    message: "User Signed Up",
    data: SignupData,
  });
};

const postLogin = async (req, res) => {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModal.findOne({ email: data.email });
      if (user) {
        if (user.password == data.password) {
          res.cookie("isLoggedIn", true);
          return res.json({
            Message: "User has LoggedIn",
            userDetails: data,
          });
        } else {
          return res.json({
            Message: "Wrong Credential",
          });
        }
      } else {
        return res.json({
          Message: "User not found",
        });
      }
    } else {
      return res.json({
        Message: "Please enter",
      });
    }
  } catch (err) {
    return res.status(500).json({
      Message: err.message,
    });
  }
};

const getLoginPage = async (req, res) => {};

authRouter.route("/signup").get(getSignupPage).post(postSignup);
authRouter.route("/Login").get(getLoginPage).post(postLogin);

module.exports = authRouter;
