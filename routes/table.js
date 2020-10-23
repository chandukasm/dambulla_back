const express = require("express");
const router = express.Router();
const Joi = require("joi");
const multer = require("multer");
const pool = require("../components/connection");

router.get("/patient", (req, res) => {
  try {
    const rep = pool.query(
      "create table if not exists patient(index serial primary key , f_name varchar(50) not null,l_name varchar(50) not null ,gender varchar(10) , address varchar(255),id varchar(30),dob timestamp with time zone NOT NULL, tel varchar(20) not null);"
    );
    console.log(rep);
    res.status(200).send("table creted successully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/staff", (req, res) => {
  try {
    const rep = pool.query(
      "create table if not exists staff(index serial primary key , f_name varchar(50) not null,l_name varchar(50) not null ,username varchar(50) not null ,password varchar(50) not null , tel varchar(20) not null);"
      // "ALTER TABLE staff RENAME COLUMN index TO id;"
    );
    console.log(rep);
    res.status(200).send("table staff creted successully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/record", (req, res) => {
  try {
    const rep = pool.query(
      "create table if not exists record(index serial primary key , patient int references patient(id)" +
        " ,crated timestamp without time zone not null default current_timestamp," +
        "path varchar not null ,uploader int  references staff(id))"
      // "ALTER TABLE record RENAME COLUMN index TO id;"
    );
    console.log(rep);
    res.status(200).send("table record creted successully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
