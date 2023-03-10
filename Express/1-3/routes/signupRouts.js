
const express = require("express");
const router = express();
const path = require("path");
const crud = require("../crud");
const fs = require("fs/promises");
const dbAddress = path.join(__dirname, "../DB/users-data.json");
let users = require("../DB/users-data.json");


let x = {
  firsname: "hassan",
  lastname: "Karami",
  username: "Hk",
  password: "user1234",
  gender: "male",
};
//GET auth/signup 
router.get("/auth/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/signup-page.html"));
});
//POST auth/signup
router.post("/auth/signup", async (req, res) => {
let duplicateUsername = users.find(user=>user.username === req.body.username)
if(duplicateUsername) {
  res.status(500).send({"message":"this username already exists."});
  return null;
}
users.push(req.body);
await fs.writeFile(dbAddress,JSON.stringify(users));
res.status(201).send({ "message": "user created successfully" });
});

//GET auth/login
router.get("/auth/login",(req,res)=>{
  res.sendFile(path.join(__dirname,"../views/login-page.html"));
})

//POST auth/login
router.post("/auth/login",(req,res)=>{
const targetUser=users.find(user=>user.username=== req.body.username);
if(!targetUser){ res.status(404).send({"message":"user not found"});
return null;
}
if(targetUser.password !== req.body.password){
  res.status(500).send({ message: "password is not correct" });
  return null;
}
res.status(200).json(targetUser);


  
})


module.exports= router;
