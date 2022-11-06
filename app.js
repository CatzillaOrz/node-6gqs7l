// run `node index.js` in the terminal
const path = require("path");
const rootDir = require("./util/path");
const express = require("express");
const bodyParser = require("express");
const { mongoConnect } = require("./util/database");

const adminRoutes = require("./routes/admin");
const shopRouter = require("./routes/shop");

const errorController = require("./controllers/error");

const app = express();
app.set("view engine", "ejs");

app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes.routes);
app.use(shopRouter);

app.use(errorController.get404);

mongoConnect((client) => {
  app.listen(8080);
});
