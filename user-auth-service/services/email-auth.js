const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("./nodemailer-service.js");

let User = mongoose.model("users");

module.exports.registerUser = async(userData, req,res) => {
    if (userData.password !== userData.password2) {
        res.send('Passwords do not match');
    }
    const hash = await bcrypt.hash(userData.password, 10);
    userData.password = hash;
    const token = jwt.sign(
        { userId: userData.email },
        process.env.JWT_SECRET
    );
    let userToSave = new User({
        userId: userData.email,
        password:  userData.password,
        confirmationCode: token,
    });
   
    const response = await saveUser(userToSave, token);
    return response;
}

const saveUser = async(user, token) => {
    try {
        const result = await user.save();
        if (result) {
            await nodemailer.sendConfirmationEmail(result.userId, token);
            return (`Pending registration confirmation for ${result.userId}`);
        } 

    } catch(err) {
        if (err.code === 11000) {
           return ("This email address is already associated with an account");
        } 
        return(`There was an error creating the user: ${err}`);
    }
}

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

