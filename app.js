// run `node index.js` in the terminal
const path = require("path");
const express = require("express");
const bodyParser = require("express");
const rootDir = require("./util/path");
const app = express();
const adminData = require("./routes/admin");
const shopRouter = require("./routes/shop");

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/admin", adminData.routes);
app.use(shopRouter);

app.use((req, res, next) => {
  res.render("404");
});
app.listen(8080);
