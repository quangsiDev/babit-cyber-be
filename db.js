const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  user: "ul9vumq2nudxfzdx",
  password: "SBLnU49dMjEV6dasMyMs",
  host: "bqzivh3ntgqaxu0vj4dy-mysql.services.clever-cloud.com",
  database: "bqzivh3ntgqaxu0vj4dy",
});
module.exports = pool;
