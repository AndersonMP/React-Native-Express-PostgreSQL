const { Client } = require("pg");

const sql = new Client({
  host: "localhost",
  port: 5432,
  database: "Equipos",
  user: "postgres",
  password: "Anderson241@",
});


sql.connect();

module.exports = sql;