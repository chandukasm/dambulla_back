const express = require("express");
const router = express.Router();
const Joi = require("joi");
const pool = require("../components/connection");
const multer = require("multer");

router.get("/:id/all", (req, res) => {
  const id = req.params.id;
  const query = `SELECT * from record where patient=${id}`;

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

router.post("/:id", async (req, res, next) => {
  const scheama = {
    id: Joi.int().required(),
  };

  const result = Joi.validate(req.body, scheama);
  if (result.error) {
    console.log(result.error.details[0].message);
    res.status(400).send(result.error.details[0].message);
    console.log(result.error.details[0].message);
    return;
  }

  const { id } = req.params;
  const path = "/c/dambulla/patients/rec_name";
  const query = `INSERT INTO record(patient,path)values(${id},'${path}') RETURNING *`;

  const result1 = await pool.query(query, values);
  res.status(200).send(result1.rows);
  console.log(result1.rows);
  // no need to add try catchs because express async errors monkypatchs the middleware
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${req.headers.sender}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res, next) => {
  const file = req.file;
  console.log(req.headers);
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

// router.post("/", async (req, res) => {
//   const scheama = {
//     f_name: Joi.string().min(2).required(),
//     l_name: Joi.string().min(2).required(),
//     dob: Joi.string().required(),
//     gender: Joi.string().required(),
//     address: Joi.string().min(3).required(),
//     id: Joi.string().min(5).required(),
//     tel: Joi.string(),
//   };

//   const result = Joi.validate(req.body, scheama);
//   if (result.error) {
//     console.log(result.error.details[0].message);
//     res.status(400).send(result.error.details[0].message);
//     console.log(result.error.details[0].message);
//     return;
//   }

//   const { f_name, l_name, gender, dob, address, id, tel } = req.body;
//   const values = [f_name, l_name, dob, gender, address, id, tel];
//   const query = `INSERT INTO patient(f_name, l_name, dob, gender,address,id,tel)VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
//   try {
//     const result = await pool.query(query, values);
//     res.status(200).send(result.rows);
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).send(error.message);
//   }
// });

//file upload

module.exports = router;
