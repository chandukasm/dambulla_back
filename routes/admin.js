const express = require("express");
const router = express.Router();
const pool = require("../components/connection");
const bc = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/authenticate");

//adding a new user
router.post("/add", async (req, res) => {
  const schema = {
    f_name: Joi.string().min(3).required(),
    l_name: Joi.string().min(2).required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    tel: Joi.string().required(),
    role: Joi.string().required(),
  };

  const result = Joi.validate(req.body, schema);
  //   console.log(result);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const { f_name, l_name, username, password, role, tel } = req.body;

  const salt = await bc.genSalt(10);
  const pw = await bc.hash(password, salt);
  const values = [f_name, l_name, username, pw, role, tel];
  // console.log("these are the values : " + values);

  pool.query(
    "INSERT INTO staff (f_name,l_name,username,password,role,tel) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
    values,
    (err, result) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        const tokenUser = result.rows[0];
        const token = jwt.sign(tokenUser, config.get("jwtPrivateKey"));
        console.log(token);
        res.header("x-auth-token", token).send(result.rows);
      }
    }
  );
});

router.get("/", auth, (req, res) => {
  pool.query("SELECT * from staff", (err, result) => {
    if (err) {
      console.log(err.message);
    }
    res.send(result.rows);
  });
});

module.exports = router;
