const mongoose = require("mongoose");
let Profile = mongoose.model("profiles");

// This function returns an array with URLs of profile photos
module.exports.getPhotos = (id) => {
  return new Promise((resolve, reject) => {
    Profile.find({
      userId: id,
    })
      .exec()
      .then((profile) => {
        resolve(profile.photos);
      })
      .catch((err) => {
        reject(`Unable to get photos for user with id: ${id}`);
      });
  });
};

module.exports.addPhoto = (id, photoUrl) => {
  return new Promise((resolve, reject) => {
    Profile.findOne({
      userId: id,
    })
      .exec()
      .then((profile) => {
        if (profile.photos.length < 10) {
          // max 10 photos allowed
          Profile.findOneAndUpdate(
            { userId: id },
            { $addToSet: { photos: photoUrl } },
            { new: true }
          )
            .exec()
            .then((profile) => {
              resolve(profile.photos);
            })
            .catch((err) => {
              reject(`Unable to update photos for user with id: ${id}`);
            });
        } else {
          reject(
            `Max allowed amount of photos is already added for user with id: ${id}`
          );
        }
      });
  });
};

module.exports.removePhoto = (id, photoId) => {
  return new Promise((resolve, reject) => {
    Profile.findOneAndUpdate(
      { userId: id },
      { $pull: { photos: photoId } },
      { new: true }
    )
      .exec()
      .then((profile) => {
        resolve(profile.photos);
      })
      .catch((err) => {
        reject(`Unable to update photos for user with id: ${id}`);
      });
  });
};
