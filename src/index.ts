var express = require("express");
var path = require("path");
var http = require("http");
require("dotenv").config();
var app = express();
var morgan = require( "morgan" );
require( "./connect/database" );
require("./upload/cloudinary")
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { CheckToken } from "./controllers/Admin/Auth.Controller";
import { debug } from "console";
import { Check } from "typeorm";
const redis = require("redis");
const client = redis.createClient();
const kue = require("kue");

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
var AdminRouter = require( "./routers/admin.router" );
morgan.token('id', function getId (req) {
  return req.id
} )
app.use( morgan( 'dev' ));
app.use("/user",CheckToken, UserRouter);
app.use("/book",CheckToken, BookRouter);
app.use("/student", StudentRouter);
app.use("/poster",CheckToken, PosterRouter);
app.use("/admin", AdminRouter);
app.use( "/kue-api/",CheckToken, kue.app );

app.get("/", (req, res) => {
  res.send("<h1>Chào mừng bạn đến với Thư Viện Hội Sinh viên UET</h1>");
});
app.use(express.static(path.join(__dirname, "public")));
var server = http.createServer(app);

server.listen( 3001);
server.on( 'listening', onListening );
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}
