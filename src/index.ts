var express = require("express");

require("dotenv").config();
var app = express();
require("./connect/database");

var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var UserRouter = require("./routers/user.router");
var BookRouter = require("./routers/book.router");
app.use("/user", UserRouter);
app.use("/book", BookRouter);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get("/", (req, res) => {
  res.send("Xin chao");
});

app.listen(3000, () => {
  console.log("Server is listening port 3000");
});
