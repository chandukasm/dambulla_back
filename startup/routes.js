const express = require("express");
const auth = require("../routes/auth");
const patient = require("../routes/Patients");
const table = require("../routes/table");
const err = require("../middleware/error");
const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = function (app) {
  //middleware
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  // app.use("/api/auth", auth);
  // app.use("/api/traveler", traveler);
  app.use("/api/patient", patient);
  app.use("/table", table);
  //a single place to hanle errors
  app.use(err); //not calling the function just passing  a reference to the function
};
