const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});
app.listen(port, () => {
  console.log("App is online");
});
