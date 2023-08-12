const express = require("express");

const app = express();

app.use(express.json());

app.listen(3000);

let users = {};

//For Getting the Data from Server to Browser Whenever User Request
// app.get("/user", (req, res) => {
//   res.send(users);
// });

//For Sending Data From Frontend to Backend
app.post("/user", (req, res) => {
  console.log(req.body);
  users = req.body;
  res.json({
    Message: "Data Recieved Sucessfully",
    user: req.body,
  });
});

//Update->path
//Updates Data in Users Object
app.patch("/user", (req, res) => {
  console.log("req.body->", req.body);
  let dataToBeUpdated = req.body;
  for (key in dataToBeUpdated) {
    users[key] = dataToBeUpdated[key];
  }
  res.json({
    Message: "Data updated Successfully",
  });
});

//To Delete a Data
app.delete("/user", (req, res) => {
  users = {};
  res.json({
    Message: "Data has been deleted",
  });
});

//Parameters For Getting Data According To Specific Route
app.get("/user/:username", (req, res) => {
  console.log(req.params.username);
  console.log(req.params);
  res.send("Sending Parameter");
});

app.get("/user", (req, res) => {
  console.log(req.query);
  res.send(users);
});
