/*
 * Server for user auth service, connects to MongoDB and listens for requests
 */

const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
const mongoose = require("mongoose");

require("./models/User");
require("./services/google-facebook-auth");
require("./services/email-auth");

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to Mongo DB");
  }
);

app.use(passport.initialize());

require("./routes/authRoutes")(app);

app.listen(HTTP_PORT, () => {
  console.log("API listening on: " + HTTP_PORT);
});
