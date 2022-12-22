const mongoose = require("mongoose");
let Profile = mongoose.model("profiles");

module.exports.registerProfile = (userId) => {
  return new Promise((resolve, reject) => {
    let newProfile = new Profile({
      userId: userId,
    });
    newProfile
      .save((err) => {
        if (err) {
          if (err.code == 11000) {
            reject("This userId is already associated with an account");
          } else {
            reject("There was an error creating the profile: " + err);
          }
        }
        resolve("Successfully registered profile for " + userId);
      })
      .catch((err) => reject(err));
  });
};

// This function returns user info including current age
module.exports.getProfileInfo = (userId) => {
  return new Promise((resolve, reject) => {
    Profile.find({
      userId: userId,
    })
      .exec()
      .then((profile) => {
        // Calculating user age and adding it to profile info
        let ageDifference = Date.now() - profile.dob.getTime();
        let ageDateObject = new Date(ageDifference);
        let ageTemp = ageDateObject.getUTCFullYear() - 1970;
        let age = ageTemp > 0 ? ageTemp : 0;
        profile["age"] = age;

        resolve(profile);
      })
      .catch((err) => reject(err));
  });
};
