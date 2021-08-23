const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.get("/about", (req, res) => {
  res.status(200).send("This is the about route");
});

app.listen(port, () => {
  console.log("App is online");
});
