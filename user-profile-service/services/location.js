/* This service will set location for users who manually update it */

const mongoose = require("mongoose");
let Profile = mongoose.model("profiles");

// This function returns location object for a user with id passed as a parameter
module.exports.getLocation = (id) => {
  return new Promise((resolve, reject) => {
    Profile.find({
      userId: id,
    })
      .exec()
      .then((profile) => {
        resolve(profile.location);
      })
      .catch((err) => {
        reject(`User with id: ${id} hasn't shared their location yet`);
      });
  });
};

// This function adds country for users who manually pick a country
module.exports.addCountry = (id, country) => {
  return new Promise((resolve, reject) => {
    Profile.findOneAndUpdate(
      { userId: id },
      { $set: { location: { country: country } } }
    )
      .exec()
      .then((profile) => {
        resolve(profile.location);
      })
      .catch((err) => {
        reject(`Unable to update Name for user with id: ${id}`);
      });
  });
};

// This function adds city for users who manually pick a country
module.exports.addCity = (id, city) => {
  return new Promise((resolve, reject) => {
    Profile.findOneAndUpdate(
      { userId: id },
      { $set: { "location.city": city } }
    )
      .exec()
      .then((profile) => {
        console.log(profile);
        resolve(profile.location);
      })
      .catch((err) => {
        reject(`Unable to update Name for user with id: ${id}`);
      });
  });
};

// This function adds location object for users whose location was identified via Google API
module.exports.setLocation = (id, coordinates) => {
  return new Promise((resolve, reject) => {
    Profile.findOneAndUpdate(
      { userId: id },
      { $set: { location: { lat: coordinates.lat, lng: coordinates.lng } } }
    )
      .exec()
      .then((profile) => {
        resolve(profile.location);
      })
      .catch((err) => {
        reject(`Unable to update location for user with id: ${id}`);
      });
  });
};
