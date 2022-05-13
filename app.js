const express = require("express");
const app = express();
const morgan = require("morgan");

//setting up the view engine
app.set("view engine", "ejs");

//setting up the path for CSS
app.use(express.static(__dirname + "/public"));

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//morgan middleware
app.use(morgan("tiny"));

const ownership = require("./routes/ownership");
const home = require("./routes/home");

//router middleware
app.use("/api/v1", ownership);
app.use("/api/v1", home);

//export app.js
module.exports = app;
