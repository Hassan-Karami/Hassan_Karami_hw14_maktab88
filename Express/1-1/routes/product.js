const express = require("express");
const router = express.Router();
const crud = require("../crud");
const path = require("path");
const dbAddress = path.join(__dirname, "../DB/products-data.json");
router.get("/product/get-all-products", (req, res) => {
  let productsList = require("../DB/products-data.json");
  res.status(200).send(productsList.length);
});

router.get("/product/get-product/:id", (req, res) => {
  let productsList = require("../DB/products-data.json");
  let targetProduct = productsList.find(
    (product) => product.id == req.params.id
  );
  res.status(200).send(targetProduct);
});

router.post("/product/create-product/:id", (req, res) => {
  const main = async () => {
    let accepted = await crud.create(+req.params.id, dbAddress, req.body);
    if (!accepted) res.status(500).send("failed to add data to database");
    else res.status(201).send("Product Created Successfully");
  };
  main();
});

router.put("/product/update-product/:id", (req, res) => {
  // res.send(req.params.id+"Update Products");
  const main = async () => {
    let accepted = await crud.update(+req.params.id, dbAddress, req.body);
    if (!accepted) res.status(500).send("failed to add data to database");
    else res.status(201).send("Product Updated Successfully");
  };
  main();
  
});

router.patch("/product/update-product/:id", (req, res) => {
    const main = async () => {
      let accepted = await crud.update(+req.params.id, dbAddress, req.body);
      if (!accepted) res.status(500).send("failed to add data to database");
      else res.status(201).send("Product Updated Successfully");
    };
    main();
});

router.delete("/product/remove-product/:id", (req, res) => {
    const main = async () => {
      let accepted = await crud.remove(+req.params.id, dbAddress, req.body);
      if (!accepted) res.status(500).send("failed process...");
      else res.status(201).send("Product Removed Successfully");
    };
    main();
});

module.exports = router;
