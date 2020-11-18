let express = require("express");
let path = require("path");
let http = require("http");
require("dotenv").config();
let app = express();
let morgan = require("morgan");
require("./connect/database");
require("./upload/cloudinary");
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { CheckToken } from "./controllers/Admin/Auth.Controller";
import { debug } from "console";
import { loadIo } from "./io";
// const redis = require("redis");
// const client = redis.createClient();
// const kue = require("kue");

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
  preflightContinue: true,
};
app.use(cors(options));

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let UserRouter = require("./routers/user.router");
let BookRouter = require("./routers/book.router");
let StudentRouter = require("./routers/student.router");
let PosterRouter = require("./routers/poster.router");
let AdminRouter = require("./routers/admin.router");
morgan.token("id", function getId(req) {
  return req.id;
});
app.use(morgan("dev"));
app.use("/user", CheckToken, UserRouter);
app.use("/book", CheckToken, BookRouter);
app.use("/student", StudentRouter);
app.use("/poster", CheckToken, PosterRouter);
app.use("/admin", AdminRouter);
// app.use( "/kue-api/",CheckToken, kue.app );

app.get("/", (req, res) => {
  res.send("<h1>Chào mừng bạn đến với Thư Viện Hội Sinh viên UET</h1>");
});
app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers");
});
let server = http.createServer(app);
loadIo(server);
server.listen(3001);
server.on("listening", onListening);
function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
