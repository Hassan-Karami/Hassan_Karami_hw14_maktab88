const express = require("express");
const router = express.Router();
const crud = require("../crud");
const path = require("path");
const dbAddress = path.join(__dirname, "../DB/products-data.json");

//Get All Products Information
router.get("/product/get-all-products", (req, res) => {
  let productsList = require("../DB/products-data.json");
  res.status(200).send(productsList);
});
//GEt A Specified Product With ID
router.get("/product/get-product/:id", (req, res) => {
  let productsList = require("../DB/products-data.json");
  let targetProduct = productsList.find(
    (product) => product.id == req.params.id
  );
  if(!targetProduct) res.status(404).send("Product Not Found!!")
  else res.status(200).send(targetProduct);
});

// ADD New Product To Database
router.post("/product/create-product", (req, res) => {
  const main = async () => {
    let accepted = await crud.create(dbAddress, req.body);
    if (!accepted) res.status(500).send("failed to add data to database");
    else res.status(201).send("Product Created Successfully");
  };
  main();
});

//Updata A Product With PUT
router.put("/product/update-product/:id", (req, res) => {
  const main = async () => {
    let accepted = await crud.update(+req.params.id, dbAddress, req.body);
    if (!accepted) res.status(500).send("failed to add data to database");
    else res.status(201).send("Product Updated Successfully");
  };
  main();
  
});

//Update A Product With PATCH
router.patch("/product/update-product/:id", (req, res) => {
    const main = async () => {
      let accepted = await crud.update(+req.params.id, dbAddress, req.body);
      if (!accepted) res.status(500).send("failed to add data to database");
      else res.status(201).send("Product Updated Successfully");
    };
    main();
});

//Remove a Product by ID
router.delete("/product/remove-product/:id", (req, res) => {
    const main = async () => {
      let accepted = await crud.remove(+req.params.id, dbAddress, req.body);
      if (!accepted) res.status(500).send("failed process...");
      else res.status(201).send("Product Removed Successfully");
    };
    main();
});

module.exports = router;
