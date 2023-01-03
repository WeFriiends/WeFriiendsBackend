/* Routes for modifying user data */
const passport = require("passport");
const profileService = require("../services/name-gender-bio");
const dateService = require("../services/date");
const locationService = require("../services/location");
const additionalInfoService = require("../services/interests");

module.exports = (app) => {
  //This route updates name of a user in the profile
  app.post(
    "/api/profile/name",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      console.log(req.body.name);
      profileService
        .addName(req.user.userId, req.body.name)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((msg) => {
          res.status(422).json({ error: msg });
        });
    }
  );

  //This route sets gender of a user in the profile
  app.put(
    "/api/profile/gender/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      profileService
        .addGender(req.user.userId, req.params.id)
        .then((data) => {
          res.json(data);
        })
        .catch((msg) => {
          res.status(422).json({ error: msg });
        });
    }
  );

  //This route sets bio (short description) of a user in the profile
  app.put(
    "/api/profile/bio/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      profileService
        .addBio(req.user.userId, req.params.id)
        .then((data) => {
          res.json(data);
        })
        .catch((msg) => {
          res.status(422).json({ error: msg });
        });
    }
  );

  // This route sets date of birth and zodiac sign of the user
  app.post(
    "/api/profile/dob",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      console.log(req.body);
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
    }
  );

  //This route sets location (country) of a user in the profile
  app.put(
    "/api/profile/location/country/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      locationService
        .addCountry(req.user.userId, req.params.id)
        .then((data) => {
          res.json(data);
        })
        .catch((msg) => {
          res.status(422).json({ error: msg });
        });
    }
  );

  //This route sets location (country) of a user in the profile
  app.put(
    "/api/profile/location/city/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      locationService
        .addCity(req.user.userId, req.params.id)
        .then((data) => {
          res.json(data);
        })
        .catch((msg) => {
          res.status(422).json({ error: msg });
        });
    }
  );

  //This route updates "looking for" section of a user in the profile
  app.post(
    "/api/profile/lookingfor",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      additionalInfoService
        .addReason(req.user.userId, req.body.interests)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((msg) => {
          res.status(422).json({ error: msg });
        });
    }
  );
};
