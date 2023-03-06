
const fs = require("node:fs/promises");
const path = require("path");

const itemsTemplate = [
  "username",
  "firstname",
  "lastname",
  "gender"
];

/****************CREATE****************/
const create = async (databaseAddress, newObject) => {
  try {
    let dataList = await fs.readFile(databaseAddress, "utf-8");
    dataList = await JSON.parse(dataList);
    let username = newObject.username;
    // validation for all create
    let vals = Object.values(newObject);
    let keys = Object.keys(newObject);
    if (typeof newObject !== "object" || Array.isArray(newObject))
      throw new Error("!!! only objects are allowed");
    if (keys.length === 0) throw new Error("!!! Empty objects are not allowed");
    let duplicate = dataList.find(
      (data) => data.username === username
    );
    if (duplicate)
      throw new Error("This 'username' existing now!!, Try another one.");
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
    //End of Validations

    dataList.push(newObject);
    await fs.writeFile(databaseAddress, JSON.stringify(dataList));
    return true;
  } catch (err) {
    console.log(err);
  }
};

/****************UPDATE****************/

const update = async (username, databaseAddress, updateObject) => {
  try {
    let dataList = await fs.readFile(databaseAddress, "utf-8");
    dataList = await JSON.parse(dataList);
    // validation for all updates
    let duplicate = dataList.find(
      (data) => data.username === username
    );
    if (!duplicate) throw new Error(`username ${username} deesn't exist`);
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

    //End of Validations
    let targetItem = dataList.find((item) => item.username === username);
    Object.assign(targetItem, updateObject);
    fs.writeFile(databaseAddress, JSON.stringify(dataList));
    return true;
  } catch (err) {
    console.log(err);
  }
};

/****************DELETE****************/

const remove = async (username, databaseAddress) => {
  try {
    let dataList = await fs.readFile(databaseAddress, "utf-8");
    dataList = await JSON.parse(dataList);
    // validation for all updates
    let duplicate = dataList.find(
      (data) => data.username === username
    );
    if (!duplicate) throw new Error(`username ${username} deesn't exist`);
    let newDataList = dataList.filter((item) => item.username !== username);
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
