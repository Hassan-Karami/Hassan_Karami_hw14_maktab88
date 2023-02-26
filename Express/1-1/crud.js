const { writeFile } = require("node:fs");
const fs = require("node:fs/promises");
const path = require("path");

const itemsTemplate = [
  "title",
  "price",
  "rating",
  "stock",
  "brand",
  "category",
];

/****************CREATE****************/
const create = async (id, databaseAddress, newObject) => {
  try {
    let dataList = await fs.readFile(databaseAddress, "utf-8");
    dataList = await JSON.parse(dataList);
    //id validation
    if (typeof id !== "number") throw new Error("id must be a Number");
    // validation for all create
    let vals = Object.values(newObject);
    let keys = Object.keys(newObject);
    if (typeof newObject !== "object" || Array.isArray(newObject))
      throw new Error("!!! only objects are allowed");
    if (keys.length === 0) throw new Error("!!! Empty objects are not allowed");
    let duplicate = dataList.find(
      (data) => data.id.toString() === id.toString()
    );
    if (duplicate)
      throw new Error("This 'id' existing now!!, Try another one.");
    if (keys.length !== itemsTemplate.length)
      throw new Error(`!!!number of items must be ${itemsTemplate.length}`);
    let diff = keys.filter((property) => !itemsTemplate.includes(property));
    if (diff.length !== 0)
      throw new Error(`!!!different item found: => ${diff.join(" , ")} `);
    let emptyItems = keys.filter((property) => newObject[property] === "");
    if (emptyItems.length !== 0)
      throw new Error(
        `value of items must not be empty. incorrect items are: '${emptyItems.join(
          " , "
        )}'`
      );
    //exclusive create validation: only fot this practice
    if (
      typeof newObject.price !== "number" ||
      typeof newObject.rating !== "number" ||
      typeof newObject.stock !== "number"
    )
      throw new Error("price,stock and rating dataType must be 'Number'");
    //End of Validations

    dataList.push({ id, ...newObject });
    await fs.writeFile(address, JSON.stringify(dataList));
    return true;
  } catch (err) {
    console.log(err);
  }
};

/****************UPDATE****************/

const update = async (id, databaseAddress, updateObject) => {
  try {
    let dataList = await fs.readFile(databaseAddress, "utf-8");
    dataList = await JSON.parse(dataList);
    //id validation
    if (typeof id !== "number") throw new Error("id must be a Number");
    // validation for all updates
    let duplicate = dataList.find(
      (data) => data.id.toString() === id.toString()
    );
    if (!duplicate) throw new Error(`id number ${id} deesn't exist`);
    let vals = Object.values(updateObject);
    let keys = Object.keys(updateObject);
    if (typeof updateObject !== "object" || Array.isArray(updateObject))
      throw new Error("!!! only objects are allowed");
    if (keys.length === 0) throw new Error("!!! Empty objects are not allowed");
    let diff = keys.filter((property) => !itemsTemplate.includes(property));
    if (diff.length !== 0)
      throw new Error(`!!!different item found: => ${diff.join(" , ")} `);
    let emptyItems = keys.filter((property) => updateObject[property] === "");
    if (emptyItems.length !== 0)
      throw new Error(
        `value of items must not be empty. incorrect items are: '${emptyItems.join(
          " , "
        )}'`
      );
    //exclusive update validation: only for this practice

    //End of Validations
    let targetItem = dataList.find((item) => item.id === id);
    Object.assign(targetItem, updateObject);
    fs.writeFile(databaseAddress, JSON.stringify(dataList));
    return true;
  } catch (err) {
    console.log(err);
  }
};

/****************DELETE****************/

const remove = async (id, databaseAddress) => {
  try {
    let dataList = await fs.readFile(databaseAddress, "utf-8");
    dataList = await JSON.parse(dataList);
    //id validation
    if (typeof id !== "number") throw new Error("id must be a Number");
    // validation for all updates
    let duplicate = dataList.find(
      (data) => data.id.toString() === id.toString()
    );
    if (!duplicate) throw new Error(`id number ${id} deesn't exist`);
    let newDataList = dataList.filter((item) => item.id !== id);
    await fs.writeFile(databaseAddress, JSON.stringify(newDataList));
    return true;
  } catch (err) {
    console.log(err);
  }
};

//********************************************/

const crud = {
  create,
  update,
  remove,
};

module.exports = crud;
