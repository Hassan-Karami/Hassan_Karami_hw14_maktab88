const express = require("express");
const app = express();
const productRouter = require("./routes/product.js");
const path = require("path")
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/product",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/product.html"));
})
app.use("/",productRouter);
app.get("/",(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,"./views/index.html"));
})






app.listen(4000, ()=>{
    console.log("Server Is Listening On Port 4000...");
})


