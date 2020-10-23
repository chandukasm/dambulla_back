const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "base_d",
//   password: "eleos",
//   port: 5432,
//   max: 20,
// });

// const pool = new Pool({
//   user: "nnammzahukkhag",
//   host: "ec2-54-160-120-28.compute-1.amazonaws.com",
//   database: "dhpcdaj8esln4",
//   password: "820c9aaf9732664ca6e0b1a779b3cdcde433c16c77a55f00971bd866585eb517",
//   port: 5432,
//   max: 20,
//   ssl: true,
// });

const pool = new Pool({
  user: "pmykppbruuqlhu",
  host: "ec2-52-87-22-151.compute-1.amazonaws.com",
  database: "d58mlt74778u0r",
  password: "421c737d47e8f0fac0d0cf5d40c8ba7a1fb3660902c2ecdaafa602ce501cced7",
  port: 5432,
  max: 20,
  ssl: true,
});

module.exports = pool;
