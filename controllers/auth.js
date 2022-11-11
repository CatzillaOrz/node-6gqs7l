exports.getLogin = (req, res, next) => {
  res.render({
    path: "/login",
    pageTitle: "Login",
  });
};
