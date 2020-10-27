const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "base_d",
//   password: "eleos",
//   port: 5432,
//   max: 20,
// });

//aws
const pool = new Pool({
  user: "postgres",
  host: "dambulla.cz3wrdwn78xb.us-east-2.rds.amazonaws.com",
  database: "dambulla",
  password: "0RRTAt95GMimyA5kdPh9",
  port: 5432,
  max: 20,
  ssl: true,
});

// const pool = new Pool({
//   user: "pmykppbruuqlhu",
//   host: "ec2-52-87-22-151.compute-1.amazonaws.com",
//   database: "d58mlt74778u0r",
//   password: "421c737d47e8f0fac0d0cf5d40c8ba7a1fb3660902c2ecdaafa602ce501cced7",
//   port: 5432,
//   max: 20,
//   ssl: true,
// });

module.exports = pool;
