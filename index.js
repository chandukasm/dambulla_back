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

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${req.headers.sender}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res, next) => {
  const file = req.file;
  console.log(req.headers.id);
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  return res
    .status(200)
    .send(
      `file successflully uploaded as ${req.headers.sender}_${file.originalname}`
    );
});

app.get("/", (req, res) => {
  res.send("welcome to dambulla base hospitle");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  winston.info(`listining on ${port}...`);
});
