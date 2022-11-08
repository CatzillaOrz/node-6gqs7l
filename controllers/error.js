exports.get404 = (req, res, next) => {
  res.render("404", { path: "pagNotFound", pageTitle: "Page Not Found!" });
};
