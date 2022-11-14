const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  const isLoggedIn =
    //req.get("Cookie").split(";")[1].trim().split("=")[1] === "true";
    res.render("auth/login", {
      path: "/auth/login",
      pageTitle: "Login",
      isAuthenticated: false,
    });
};

exports.postLogin = (req, res, next) => {
  //res.setHeader("Set-Cookie", "loggedIn=true");
  User.findById("636bb48835192cf46ad48f26")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    console.log("user logout...");
    res.redirect("/");
  });
};
