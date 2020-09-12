import { Connection, createConnection } from "typeorm";
var config = require("./config");
let connection = createConnection(config);
module.exports = connection;
