
const express = require("express");
const router = express();
const path = require("path");
const crud = require("../crud");
const fs = require("fs/promises");
const dbAddress = path.join(__dirname, "../DB/users-data.json");

let x = {
  firsname: "hassan",
  lastname: "Karami",
  username: "Hk",
  password: "user1234",
  gender: "male",
};
//get
router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/signup-page.html"));
});
//post
router.post("/signup", async (req, res) => {
let users = require("../DB/users-data.json");
let duplicateUsername = users.find(user=>user.username === req.body.username)
if(duplicateUsername) {
  res.status(500).send({"message":"this username already exists."});
  return null;
}
users.push(req.body);
await fs.writeFile(dbAddress,JSON.stringify(users));
res.status(201).send({ "message": "user created successfully" });
});


module.exports= router;
