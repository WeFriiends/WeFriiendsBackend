/*
 * User auth via email
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("./nodemailer-service.js");
let User = mongoose.model("users");

module.exports.registerUser = (userData) => {
  return new Promise(function (resolve, reject) {
    if (userData.password != userData.password2) {
      reject("Passwords do not match");
    } else {
      bcrypt
        .hash(userData.password, 10)
        .then((hash) => {
          userData.password = hash;

          const token = jwt.sign(
            { userId: userData.email },
            process.env.JWT_SECRET
          );
          let newUser = new User({
            userId: userData.email,
            password: userData.password,
            confirmationCode: token,
          });

          newUser.save((err) => {
            if (err) {
              if (err.code == 11000) {
                reject(
                  "This email address is already associated with an account"
                );
              } else {
                reject("There was an error creating the user: " + err);
              }
            } else {
              nodemailer.sendConfirmationEmail(userData.email, token);
              resolve(
                "Pending registration confirmation for " + userData.email
              );
            }
          });
        })
        .catch((err) => reject(err));
    }
  });
};

module.exports.checkUser = (userData) => {
  return new Promise(function (resolve, reject) {
    User.findOne({ userId: userData.email })
      .exec()
      .then((user) => {
        bcrypt.compare(userData.password, user.password).then((res) => {
          if (user.status != "Active") {
            reject(
              "Pending Account. Please verify your email to gain access to your profile"
            );
          }
          if (res === true) {
            resolve(user);
          } else {
            reject("Incorrect password for user " + userData.email);
          }
        });
      })
      .catch((err) => {
        reject("Unable to find user " + userData.email);
      });
  });
};

// This function checks confirmationCode in the database and changes user status to Active if a match found
module.exports.verifyUserEmail = (confirmationCode) => {
  return new Promise(function (resolve, reject) {
    User.findOne({
      confirmationCode: confirmationCode,
    })
      .then((user) => {
        if (!user) {
          reject("User Not found.");
        }

        user.status = "Active";
        user.save((err) => {
          if (err) {
            reject({ message: err });
          } else {
            resolve("Account has been activated");
          }
        });
      })
      .catch((err) => reject(err));
  });
};
