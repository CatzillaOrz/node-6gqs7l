// run `node index.js` in the terminal
const path = require("path");
const express = require("express");
const bodyParser = require("express");
const rootDir = require("./util/path");
const app = express();
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");

app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/admin", adminRouter);
app.use(shopRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});
app.listen(8080);
