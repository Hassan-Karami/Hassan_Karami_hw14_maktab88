const express = require("express");
const router = express.Router();
router.get("/product/get-all-products",(req,res)=>{
    res.send("All Products");
});

router.get("/product/get-product/:id", (req, res) => {
  res.send(req.params.id+"Single Products");
});

router.post("/product/create-product", (req, res) => {
  res.send("Create Product");
});

router.put("/product/update-product/:id", (req, res) => {
  res.send(req.params.id+"Update Products");
});

router.patch("/product/update-product/:id", (req, res) => {
  res.send(req.params.id + "Update Products");
});


router.delete("/product/remove-product/:id", (req, res) => {
  res.send(req.params.id+"All Products");
});


module.exports= router;