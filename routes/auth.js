const express = require("express");
const router = express.Router();
const bc = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const pool = require("../components/connection");

//login
router.get("/login", async (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  password = req.body.password;

  //request validation
  const schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  //request validation//

  const values = [username];
  const user = await pool.query(
    "SELECT * FROM staff WHERE username=$1 ",
    values
  );
  if (user.rowCount === 0) {
    res.status(400).send("invalid username or password");
    return;
  }
  const tokenUser = user.rows[0];
  const sent_password = user.rows[0].password;
  const validPassword = await bc.compare(req.body.password, sent_password);
  if (validPassword) {
    const token = jwt.sign(tokenUser, config.get("jwtPrivateKey"));
    //generating the jsonwebtoken

    // res.status(200).send("you are logged in");
    res.header("x-auth-token", token).status(200).send(token);
  } else {
    res.status(400).send("forbidden");
  }
});

module.exports = router;
