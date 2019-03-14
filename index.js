var express = require("express");
var app = express();

app.use(express.static("./dist"))

app.listen(8888,"localhost",()=>console.log("请访问：http://localhost:8080"))