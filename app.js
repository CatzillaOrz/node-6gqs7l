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

function oddNumbers(l, r) {
    // Write your code here
    const arr = []
    for (let i = l; i <= r; i++) {
        if (i % 2 !== 0) arr.push(i)
    }
    return arr
}
const arr = oddNumbers(3, 9)
console.log(arr);
app.listen(8080);
