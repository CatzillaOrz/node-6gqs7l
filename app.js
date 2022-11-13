// run `node index.js` in the terminal
const path = require("path");
const rootDir = require("./util/path");
const express = require("express");
const bodyParser = require("express");
const session = require("express-session");

const mongoose = require("mongoose");

const User = require("./models/user");
const adminRoutes = require("./routes/admin");
const shopRouter = require("./routes/shop");
const authRouter = require("./routes/auth");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "catzilla secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  User.findById("636bb48835192cf46ad48f26")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes.routes);
app.use(shopRouter);
app.use(authRouter);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://catzilla:catzilla@cluster0.3wuapxa.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((_) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "catzilla",
          email: "catzilla@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(8080);
  })
  .catch((err) => console.log(err));
