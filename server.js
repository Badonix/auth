const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./userSchema");
dotenv.config();

app.use(express.json());

mongoose.connect(
  "mongodb://127.0.0.1:27017/loginplayground?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0",
  () => {
    console.log("connected");
  }
);

app.get("/", (req, res) => {
  res.send("gamarjoba");
});

app.post("/register", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    newUser.save();
    res.json({ username, email, hashedPassword });
  } catch (e) {}
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`Listening on port ${process.env.PORT}`);
});
