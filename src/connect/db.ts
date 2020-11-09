import { Connection, createConnection } from "typeorm";
let config = require("./config");
let connection = createConnection(config);
module.exports = connection;
