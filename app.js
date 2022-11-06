// run `node index.js` in the terminal
const path = require("path");
const rootDir = require("./util/path");
const express = require("express");
const bodyParser = require("express");
const { mongoConnect } = require("./util/database");
const User = require("./models/user");
const adminRoutes = require("./routes/admin");
const shopRouter = require("./routes/shop");

const errorController = require("./controllers/error");

const app = express();
app.set("view engine", "ejs");

app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById("6367bc4fa629b7b0f5951b27")
    .then((user) => {
      req.user = user;
      console.log(req.user);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes.routes);
app.use(shopRouter);

app.use(errorController.get404);

mongoConnect((client) => {
  app.listen(8080);
});
