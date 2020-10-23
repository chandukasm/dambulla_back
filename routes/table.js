const express = require("express");
const router = express.Router();
const Joi = require("joi");
const multer = require("multer");
const pool = require("../components/connection");

router.get("/patient", (req, res) => {
  try {
    const rep = pool.query(
      "create table if not exists patient(index serail primary key , f_name,l_name,gender varchar(10) , address varchar(255),id varchar(30),dob timestamp with time zone NOT NULL, tel varchar(20) not null"
    );
    console.log(rep);
    res.status(200).send("table creted successully");
  } catch (error) {
    error.message;
  }
});

module.exports = router;
