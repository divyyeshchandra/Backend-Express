const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json()); //Global Middleware function
app.use(cookieParser());

app.listen(3000);

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

//This is how we make mini app(Just like Components in React)
const userRouter = express.Router();

app.use("/user", userRouter);

userRouter.route("/getCookies").get(getCookies);

userRouter.route("/setCookies").get(setCookies);

const db_link =
  "mongodb+srv://admin:5naOtt6XtpNVShfV@cluster0.dwvjztd.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(db_link)
  .then((db) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 8,
    validate: function () {
      return this.confirmPassword == this.password;
    },
  },
});

//Modal
const userModal = mongoose.model("usermodal", userSchema);
