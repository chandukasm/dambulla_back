const express = require("express");
const auth = require("../routes/auth");
const patient = require("../routes/Patients");
const table = require("../routes/table");
const record = require("../routes/record");
const staff = require("../routes/staff");
const admin = require("../routes/admin");
const err = require("../middleware/error");
const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = function (app) {
  //middleware
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api/admin", admin);
  app.use("/api/patient", patient);
  app.use("/api/staff", staff);
  app.use("/api/record", record);
  app.use("/table", table);
  app.use("/auth", auth);
  //a single place to hanle errors
  app.use(err); //not calling the function just passing  a reference to the function
};
