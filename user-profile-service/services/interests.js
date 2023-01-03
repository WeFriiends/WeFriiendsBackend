const mongoose = require("mongoose");
let Profile = mongoose.model("profiles");

// This function returns all interests ("Looking for" section) for a user with id passed as a parameter
module.exports.getReasons = (id) => {
  return new Promise((resolve, reject) => {
    Profile.find({
      userId: id,
    })
      .exec()
      .then((profile) => {
        resolve(profile.reasons);
      })
      .catch((err) => {
        reject(
          `User with id: ${id} hasn't shared any of their reasons to join yet`
        );
      });
  });
};

// This function adds each reason to join passed in params as an array into mongo document
module.exports.addReason = (id, reason) => {
  return new Promise((resolve, reject) => {
    Profile.find({
      userId: id,
    })
      .exec()
      .then((profile) => {
        Profile.findOneAndUpdate(
          { userId: id },
          {
            $addToSet: { reason: { $each: reason } },
          }
        )
          .exec()
          .then((profile) => {
            resolve(profile.reason);
          })
          .catch((err) => {
            reject(`Unable to add reason to join for user with id: ${id}`);
          });
      });
  });
};

module.exports.removeReason = (id, reason) => {
  return new Promise((resolve, reject) => {
    Profile.findOneAndUpdate(
      { userId: id },
      { $pull: { reasons: reason } },
      { new: true }
    )
      .exec()
      .then((profile) => {
        resolve(profile.reasons);
      })
      .catch((err) => {
        reject(`Unable to remove reason to join for user with id: ${id}`);
      });
  });
};
