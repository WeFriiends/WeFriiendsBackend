const mongoose = require("mongoose");
let Profile = mongoose.model("profiles");

module.exports.registerProfile = (userId) => {
  return new Promise((resolve, reject) => {
    let newProfile = new Profile({
      userId: userId,
    });
    console.log("Trying to register");
    newProfile
      .save((err) => {
        if (err) {
          if (err.code == 11000) {
            reject("This userId is already associated with an account");
          } else {
            reject("There was an error creating the profile: " + err);
          }
        }
        resolve(newProfile);
      })
      .catch((err) => reject(err));
  });
};

// This function returns user info including current age
module.exports.getProfileInfo = (userId) => {
  return new Promise((resolve, reject) => {
    Profile.findOne({
      userId: userId,
    })
      .exec()
      .then((profile) => {
        if (!profile) {
          reject("No profile found");
        }
        if (profile.dob) {
          // Calculating user age and adding it to profile info
          let ageDifference = Date.now() - profile.dob.getTime();
          let ageDateObject = new Date(ageDifference);
          let ageTemp = ageDateObject.getUTCFullYear() - 1970;
          let age = ageTemp > 0 ? ageTemp : 0;
          let updObject = { age: age };
          let returnProfile = Object.assign(updObject, profile._doc);
          resolve(returnProfile);
        }
        resolve(profile);
      })
      .catch((err) => reject(err));
  });
};

// This function deletes user profile from a database
module.exports.deleteProfile = (id) => {
  return new Promise((resolve, reject) => {
    Profile.deleteOne({
      userId: id,
    })
      .exec()
      .then(() => {
        resolve("User has been deleted successfully");
      })
      .catch((err) => {
        reject(err);
      });
  });
};
