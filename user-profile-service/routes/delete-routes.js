const profile = require("../services/profile");
const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/api/profile/delete",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      profile
        .deleteProfile(req.user.userId)
        .then((msg) => res.json({ message: msg }))
        .catch((err) => {
          console.log(err);
          res.status(422).json({ message: err });
        });
    }
  );
};
