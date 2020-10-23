const express = require("express");
const router = express.Router();
const Joi = require("joi");
const multer = require("multer");
const pool = require("../components/connection");

app.get("/patient", (req, res) => {
  const rep = pool.query(
    "create table patient(index serail primary key , f_name,l_name,gender varchar(10) , address varchar(255),id varchar(30),dob timestamp with time zone NOT NULL, tel varchar(20) not null"
  );

  res.status(200).send("table creted successully");
});

module.exports = router;
