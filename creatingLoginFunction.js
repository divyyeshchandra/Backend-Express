const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json()); //Global Middleware function

app.use(cookieParser());

app.listen(5000);

const userRouter = require("./Routers/userRouter");
const authRouter = require("./Routers/authRouter");

app.use("/user", userRouter);
app.use("/auth", authRouter);
