// run `node index.js` in the terminal
const path = require("path");
const rootDir = require("./util/path");

const express = require("express");
const bodyParser = require("express");

const adminData = require("./routes/admin");
const shopRouter = require("./routes/shop");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/admin", adminData.routes);
app.use(shopRouter);

app.use((req, res, next) => {
  res.render("404", { path: "pagNotFound", pageTitle: "Page Not Found!" });
});

app.listen(8080);
