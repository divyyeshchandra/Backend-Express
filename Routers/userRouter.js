const express = require("express");

const userRouter = express.Router();

const userModal = require("../Models/userModel");

const protectRoute = require("./authHelper");

const getUser = async (req, res) => {
  let allUsers = await userModal.findOne({
    email: "abc23@gmail.com",
  });
  res.json({
    Message: "List of all users",
    data: allUsers,
  });
};

const postUser = (req, res) => {
  console.log(req.body);
  users = req.body;
  res.json({
    Message: "Data Recieved Sucessfully",
    user: req.body,
  });
};

const UpdateUser = async (req, res) => {
  let dataToBeUpdated = req.body;
  let user = await userModal.findOneAndUpdate(
    { email: "abc@gmail.com" },
    dataToBeUpdated
  );
  res.json({
    Message: "Data updated Successfully",
    UpdatedData: user,
  });
};

const deleteUser = async (req, res) => {
  let dataToBedeleted = req.body;
  let user = await userModal.findOneAndDelete(dataToBedeleted);
  res.json({
    Message: "Data has been deleted",
    data: user,
  });
};

const getCookies = (req, res) => {
  let cookies = req.cookies;
  console.log(cookies);
  res.send("Cookies recieved");
};

const setCookies = (req, res) => {
  res.cookie("isLoggedIn", true, {
    maxAge: 1000 * 60 * 60 * 24,
    secure: true,
    httpOnly: true,
  });
  res.cookie("isPrimeMembership", true, { httpOnly: true });
  res.send("Cookies has been set");
};

const getUserId = (req, res) => {
  console.log(req.params.id);
  let paramId = req.params.id;
  let obj = {};
  for (let i = 0; i < users.length; i++) {
    if (users[i]["id"] == paramId) {
      obj = users[i];
    }
  }
  res.json({
    message: "Req Recieved",
    data: obj,
  });
};

userRouter
  .route("/")
  .get(protectRoute, getUser)
  .post(postUser) //Path specific middleware
  .patch(UpdateUser)
  .delete(deleteUser);

userRouter.route("/getCookies").get(getCookies);

userRouter.route("/setCookies").get(setCookies);

userRouter.route("/:id").get(getUserId);

module.exports = userRouter;
