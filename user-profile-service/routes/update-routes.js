/* Routes for modifying user data */

const profileService = require("../services/name-gender-bio");
const dateService = require("../services/date");
const locationService = require("../services/location");
const additionalInfoService = require("../services/interests");

module.exports = (app) => {
  //This route updates name of a user in the profile
  app.put("/api/profile/name/:id", (req, res) => {
    profileService
      .addName(req.user.userId, req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((msg) => {
        res.status(422).json({ error: msg });
      });
  });

  //This route sets gender of a user in the profile
  app.put("/api/profile/gender/:id", (req, res) => {
    profileService
      .addGender(req.user.userId, req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((msg) => {
        res.status(422).json({ error: msg });
      });
  });

  //This route sets bio (short description) of a user in the profile
  app.put("/api/profile/bio/:id", (req, res) => {
    profileService
      .addBio(req.user.userId, req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((msg) => {
        res.status(422).json({ error: msg });
      });
  });

  // This route sets date of birth and zodiac sign of the user
  app.post("/api/profile/dob", (req, res) => {
    //modifying date into <YYYY-mm-dd> format
    let dobString = `<${req.body.year}-${
      req.body.month < 10 ? "0" + req.body.month : req.body.month
    }-${req.body.day < 10 ? "0" + req.body.day : req.body.day}>`;
    console.log(dobString);

    dateService
      .addDateOfBirthAndZodiac(req.user.userId, dobString)
      .then((data) => {
        res.json(data);
      })
      .catch((msg) => {
        res.status(422).json({ error: msg });
      });
  });
};
