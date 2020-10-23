const winston = require("winston");
require("express-async-errors");

module.exports = function () {
  //only for synchronss code
  // process.on("unncaughtException", (ex) => {
  //   console.log("unncaughtException");
  //   winston.error(ex.message, err);
  //   process.exit(1);
  // });

  //use processmanagers in production for automatically restarting the process after an exception
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "unncaughtException.log" })
  );

  //only for synchronss code
  process.on("unhandledRejection", (ex) => {
    // console.log("unhandledRejection");
    // winston.error(ex.message, err);
    // process.exit(1);
    throw ex;
  });

  winston.add(winston.transports.File, { filename: "logfile.log" });
};
