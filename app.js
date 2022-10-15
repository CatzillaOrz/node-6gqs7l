// run `node index.js` in the terminal
const express = require("express");
const bodyParser = require("express");
const rootDir = require("./util/path");
const app = express();
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(adminRouter);
app.use(shopRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(rootDir, "views", "404.html");
});
app.listen(8080);
