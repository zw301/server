// dont know if this one is working
// import express from "express";
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

//execute immediatly
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey] //multiply keys in different level security
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

// app.get("/", (req, res) => {
//   res.send({ Bye: "buddy" });
// });

//console.developers.google.com

const PORT = process.env.PORT || 5000;
app.listen(PORT);

//localhost:5000
