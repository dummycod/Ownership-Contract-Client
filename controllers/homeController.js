const BigPromise = require("../utils/BigPromise");

//Send the homepage.
exports.home = BigPromise(async function (req, res, next) {
  res.render("home");
});
