const winston = require("winston");
// require('express-async-errors')
const express = require("express");
const app = express();
const multer = require("multer");
const pool = require("./components/connection");

//use morgan to log requests

require("./startup/logging")();
require("./startup/config")();
require("./startup/routes")(app);

app.get("/", (req, res) => {
  res.send("welcome to dambulla base hospitle");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  winston.info(`listining on ${port}...`);
});
