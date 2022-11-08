// run `node index.js` in the terminal
const path = require('path');
const rootDir = require('./util/path');
const express = require('express');
const bodyParser = require('express');
const { mongoConnect } = require('./util/database');
const User = require('./models/user');
const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');

const errorController = require('./controllers/error');

const app = express();
app.set('view engine', 'ejs');

app.use(express.static(path.join(rootDir, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    User.findById('6368ff748ab136495c22ea98')
        .then((user) => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch((err) => {
            console.log(err);
        });
});

app.use('/admin', adminRoutes.routes);
app.use(shopRouter);

app.use(errorController.get404);

mongoConnect((client) => {
    app.listen(8080);
});
