var bcrypt = require("bcrypt");

var db = require("../db.js");

module.exports.login = (req, res) => {
  res.render("./auth/login.pug");
};

module.exports.postLogin = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  var user = db
    .get("users")
    .find({ email: email })
    .value();

  if (!user) {
    res.render("./auth/login.pug", {
      errors: ["User does not exist."],
      values: req.body
    });
    return;
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (!result) {
      res.render("./auth/login.pug", {
        errors: ["Invalid password!"],
        values: req.body
      });
      return;
    }

    res.cookie("userId", user.id, {
      signed: true
    });
    res.redirect("/transactions");
  });
};
