const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json()); //Global Middleware function

app.listen(3000);

let users = [
  {
    id: 1,
    name: "Abhishek",
  },
  {
    id: 2,
    name: "Divyyesh chandra",
  },
  {
    id: 3,
    name: "Naman",
  },
];

const getUser = (req, res) => {
  res.send(users);
};

const postUser = (req, res) => {
  console.log(req.body);
  users = req.body;
  res.json({
    Message: "Data Recieved Sucessfully",
    user: req.body,
  });
};

const UpdateUser = () => {
  console.log("req.body->", req.body);
  let dataToBeUpdated = req.body;
  for (key in dataToBeUpdated) {
    users[key] = dataToBeUpdated[key];
  }
  res.json({
    Message: "Data updated Successfully",
  });
};

const deleteUser = (req, res) => {
  users = {};
  res.json({
    Message: "Data has been deleted",
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

const postSignup = (req, res) => {
  let obj = req.body;
  console.log("Backend", obj);
  res.json({
    message: "User Signed Up",
    data: obj,
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
  },
});

//Modal
const userModal = mongoose.model("usermodal", userSchema);

const createUser = (async () => {
  let user = {
    name: "Divyyesh",
    email: "abcwesdf@gmail.com",
    password: "1234556",
    confirmPassword: "1234556",
  };
  let data = await userModal.create(user);
  console.log(data);
})();
