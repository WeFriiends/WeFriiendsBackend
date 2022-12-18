/*
 * User auth passport strategy for Facebook and Gmail
 */

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// Google Auth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      // check if user id already exists
      User.findOne({ userId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          // adding new user
          new User({
            userId: profile.id,
            status: "Active",
          })
            .save()
            .then((user) => {
              done(null, user);
            });
        }
      });
    }
  )
);

// Facebook Auth
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/api/auth/facebook/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      // check if user id already exists
      User.findOne({ userId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          // adding new user
          console.log("Adding a new user");
          new User({
            userId: profile.id,
            status: "Active",
          })
            .save()
            .then((user) => {
              done(null, user);
            });
        }
      });
    }
  )
);
