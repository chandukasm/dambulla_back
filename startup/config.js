const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    //by throwing an error object the stacktrace will ebe available for later
    throw new Error("FATEL ERROR: JWT PRIVATE KEY NOT DEFINED");
  }
};
