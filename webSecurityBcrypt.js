const express = require("express");
const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json()); //Global Middleware function

app.listen(3000);

const getUser = async (req, res) => {
  let allUsers = await userModal.findOne({
    email: "abc@gmail.com",
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

//You can also use Multiple Middleware like this with just using next parameter
const middleware = (req, res, next) => {
  console.log("Middleware Encountered");
  next();
};

//This is how we make mini app(Just like Components in React)
const userRouter = express.Router();
const authRouter = express.Router();

app.use("/user", userRouter);
app.use("/auth", authRouter);

authRouter.route("/signup").get(middleware, getSignupPage).post(postSignup);

userRouter
  .route("/")
  .get(getUser)
  .post(postUser) //Path specific middleware
  .patch(UpdateUser)
  .delete(deleteUser);

userRouter.route("/:id").get(getUserId);

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

userSchema.pre("save", function () {
  this.confirmPassword = undefined;
});

userSchema.pre("save", async function () {
  let salt = await bcrypt.genSalt();
  let hashedString = await bcrypt.hash(this.password, salt);
  this.password = hashedString;
});

userSchema.post("save", function (doc) {
  console.log("After Saving in DB", doc);
});

//Modal
const userModal = mongoose.model("usermodal", userSchema);

// const createUser = (async () => {
//   let user = {
//     name: "Divyyesh",
//     email: "abcwesdf@gmail.com",
//     password: "1234556",
//     confirmPassword: "1234556",
//   };
//   let data = await userModal.create(user);
//   console.log(data);
// })();
