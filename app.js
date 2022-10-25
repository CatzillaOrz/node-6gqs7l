// run `node index.js` in the terminal
const path = require("path");
const rootDir = require("./util/path");

const express = require("express");
const bodyParser = require("express");

const adminRoutes = require("./routes/admin");
const shopRouter = require("./routes/shop");

const errorController = require("./controllers/error");

const app = express();
app.set("view engine", "ejs");

app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({extended: false}));
app.use("/admin", adminRoutes.routes);
app.use(shopRouter);

app.use(errorController.get404);

function findNumber(arr, k) {
    // Write your code here
    const index = arr.findIndex(item => item === k)
    return index !== -1 ? 'YES' : "NO"
}

const arr1 = [1, 2, 5, 9];

const result = findNumber(arr1, 5)
console.log(result);
app.listen(8080);
