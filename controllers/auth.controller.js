var sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var bcrypt = require("bcrypt");

var db = require("../db.js");

module.exports.login = (req, res) => {
  res.render("./auth/login.pug");
};

module.exports.postLogin = async (req, res) => {
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
  
  if (!user.wrongLoginCount) {
    db.get("users")
      .find({ id: user.id })
      .set("wrongLoginCount", 0)
      .write();
  }
  
  if (user.wrongLoginCount = 3) {
    let msg = {
      to: user.email,
      from: "themask7786@gmail.com",
      subject: "Warning!",
      text:
        "You entered invalid password 3 times. Your account will be blocked after 4 times of invalid password",      
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log(error);
    }    
  }

  if (user.wrongLoginCount >= 4) {
    res.render("auth/login", {
      errors: ["Your account has been locked."],
      values: req.body
    });

    return;
  }

  await bcrypt.compare(password, user.password, (err, result) => {
    if (!result) {
      db.get('users')
        .find({id: user.id})
        .assign({wrongLoginCount: (user.wrongLoginCount += 1) })
        .write();
      
      res.render("./auth/login.pug", {
        errors: ["Invalid password!"],
        values: req.body
      });
      return;
    }

    res.cookie("userId", user.id, {
      signed: true
    });
    db.get('users')
        .find({id: user.id})
        .assign({wrongLoginCount: 0 })
        .write();
    res.redirect("/transactions");
  });
};
