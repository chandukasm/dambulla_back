const express = require("express");
const router = express.Router();
const Joi = require("joi");
const pool = require("../components/connection");

router.post("/add", async (req, res, next) => {
  console.log(req.body);
  const scheama = {
    f_name: Joi.string().min(2).required(),
    l_name: Joi.string().min(2).required(),
    tel: Joi.string(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, scheama);
  if (result.error) {
    console.log(result.error.details[0].message);
    res.status(400).send(result.error.details[0].message);
    console.log(result.error.details[0].message);
    return;
  }

  const { f_name, l_name, tel, username, password } = req.body;
  const values = [f_name, l_name, tel, username, password];
  const query = `INSERT INTO staff(f_name, l_name,tel,username,password)VALUES($1,$2,$3,$4,$5) RETURNING *`;

  const result1 = await pool.query(query, values);
  res.status(200).send(result1.rows);
  console.log(result1.rows);
  // no need to add try catchs because express async errors monkypatchs the middleware
});

router.get("/all", (req, res) => {
  const query = `SELECT * from staff`;

  pool.query(query, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      console.table(result.rows);
      res.send(result.rows);
    }
  });
});
router.get("/:id", (req, res) => {
  const { id } = req.params.id;
  const query = `SELECT * from staff where id=${id}`;

  pool.query(query, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      console.table(result.rows);
      res.send(result.rows);
    }
  });
});

// add new patient id ,id is not available should generate a new uniquie one

module.exports = router;
