/*
 * Routes for user auth via email, Facebook and Gmail
 */

const passport = require("passport");
const jwt = require("jsonwebtoken");
const userService = require("../services/email-auth.js");

module.exports = (app) => {
  // ================    Email auth routes ======================== //
  app.post("/api/auth/register", (req, res) => {
    userService
      .registerUser(req.body)
      .then((msg) => {
        res.json({ message: msg });
      })
      .catch((msg) => {
        res.status(422).json({ message: msg });
      });
  });

  app.post("/api/auth/signin", (req, res) => {
    userService
      .checkUser(req.body)
      .then((user) => {
        let payload = {
          _id: user._id,
          userId: user.userId,
        };
        let token = jwt.sign(payload, process.env.JWT_SECRET);
        res.json({ message: "login successful", token: token });
      })
      .catch((msg) => {
        res.status(422).json({ message: msg });
      });
  });

  app.get("/api/auth/confirm/:confirmationCode", (req, res) => {
    userService
      .verifyUserEmail(req.params.confirmationCode)
      .then((msg) => res.json({ message: msg }))
      .catch((msg) => {
        res.status(422).json({ message: msg });
      });
  });

  // ====================  Google auth routes =========================== //
  app.get(
    "/api/auth/google",
    passport.authenticate("google", { scope: ["email"] })
  );

  app.get("/api/auth/google/callback", (req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
      console.log("User has been successfully authenticated with Google");
      let payload = {
        _id: user._id,
        userId: user.userId,
      };
      let token = jwt.sign(payload, process.env.JWT_SECRET);
      res.json({ message: "login successful", token: token });
    })(req, res, next);
  });

  // ==================  Facebook auth routes ======================== //
  app.get(
    "/api/auth/facebook",
    passport.authenticate("facebook", { session: false })
  );

  app.get("/api/auth/facebook/callback", (req, res, next) => {
    passport.authenticate("facebook", (err, user, info) => {
      console.log("User has been successfully authenticated with Facebook");
      let payload = {
        _id: user._id,
        userId: user.userId,
      };
      let token = jwt.sign(payload, process.env.JWT_SECRET);
      res.json({ message: "login successful", token: token });
    })(req, res, next);
  });
};
