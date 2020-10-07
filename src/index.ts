var express = require("express");
var path = require("path");
var http = require("http");
require("dotenv").config();
var app = express();
require("./connect/database");
import * as cors from "cors";
import * as bodyParser from "body-parser";
// import { ClearData } from "./service/google-api/api";
const redis = require("redis");
const client = redis.createClient();
const kue = require("kue")
// const queue = kue.createQueue();

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};
app.use(cors(options));

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var UserRouter = require("./routers/user.router");
var BookRouter = require("./routers/book.router");
var StudentRouter = require("./routers/student.router");
var PosterRouter = require("./routers/poster.router");
var AdminRouter = require("./routers/admin.router");
app.use("/user", UserRouter);
app.use("/book", BookRouter);
app.use("/student", StudentRouter);
app.use("/poster", PosterRouter);
app.use("/admin", AdminRouter);
app.use("/kue-api/", kue.app);


app.get("/", (req, res) => {
  // ClearData("")
  res.send("Xin chao");
});
app.use(express.static(path.join(__dirname, "public")));
var server = http.createServer(app);

server.listen(3001, () => {
  console.log("Server is listening port 3000");
});
