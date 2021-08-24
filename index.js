require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const { connection } = require("./db");
const { addUser, listUsers } = require("./utils/user");
const saltRounds = 10;

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // This ensures input is considered to be json

app.post("/register", async (req, res) => {
  if (req.body.password !== req.body.checkPassword) {
    return res.status(401).json({ message: `Passwords don't match` });
  } else if (!req.body.name) {
    return res.status(401).json({ message: `No username provided` });
  }

  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(req.body.password, salt);

  addUser(req.body.name, hash);
  res.status(201).json({ users: await listUsers() });

  // User entered two different passwords
  /*if (await bcrypt.compare(req.body.checkPassword, hash)) {
        res.status(201).json({"message": `Password ${req.body.checkPassword} matches ${hash}`});
    } else {
        res.status(401).json({"message": `Password ${req.body.checkPassword} does not match ${hash}`});
    }*/
});

app.listen(port, () => {
  connection.authenticate();
  console.log("App is online");
});
