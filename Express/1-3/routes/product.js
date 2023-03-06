const express = require("express");
const router = express.Router();
const crud = require("../crud");
const path = require("path");
const dbAddress = path.join(__dirname, "../DB/users-data.json");

// Get All Users Information
router.get("/admin/get-all-users", (req, res) => {
  let usersList = require("../DB/users-data.json");
  res.status(200).send(usersList);
});

router.get("/admin/panel",(req,res)=>{
  res.sendFile(path.join(__dirname,"../views/index.html"))
})
//GEt A Specified User With Username
router.get("/admin/get-user/:username", (req, res) => {
  let usersList = require("../DB/users-data.json");
  let targetUser = usersList.find(
    (user) => user.username == req.params.username
  );
  if(!targetUser) res.status(404).send("User Not Found!!")
  else res.status(200).send(targetUser);
});

// ADD New User To Database
router.post("/admin/create-user", (req, res) => {
  const main = async () => {
    let accepted = await crud.create(dbAddress, req.body);
    if (!accepted) res.status(500).send("failed to add data to database");
    else res.status(201).send("User Created Successfully");
  };
  main();
  
});

//Updata A User With PUT
router.put("/admin/update-user/:username", (req, res) => {
  const main = async () => {
    let accepted = await crud.update(req.params.username, dbAddress, req.body);
    if (!accepted) res.status(500).send("failed to add data to database");
    else res.status(201).send("User Updated Successfully");
  };
  main();
  
});

//Update A User With PATCH
router.patch("/admin/update-user/:username", (req, res) => {
    const main = async () => {
      let accepted = await crud.update(req.params.username, dbAddress, req.body);
      if (!accepted) res.status(500).send("failed to add data to database");
      else res.status(201).sendFile(path.join(__dirname,"../views/index.html"))
    };
    main();
    
});

//Remove a User by Username
router.delete("/admin/remove-user/:username", (req, res) => {
    const main = async () => {
      let accepted = await crud.remove(req.params.username, dbAddress);
      if (!accepted) res.status(500).send("failed process...");
      else res.status(200).send("user deleted successfully");
    };
    main();
    
});

module.exports = router;
