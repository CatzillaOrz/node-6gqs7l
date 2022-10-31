// run `node index.js` in the terminal
const path = require('path');
const rootDir = require('./util/path');
const express = require('express');
const bodyParser = require('express');

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');

const errorController = require('./controllers/error');

const app = express();
app.set('view engine', 'ejs');

app.use(express.static(path.join(rootDir, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes.routes);
app.use(shopRouter);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
    .sync()
    .then((_) => {
        return User.findByPk(1);
    })
    .then((user) => {
        if (!user) {
            User.create({ name: 'Max', email: 'test@test.com' });
        }
        return Promise.resolve(user);
    })
    .then((user) => {
        console.log(user);
        app.listen(8080);
    })
    .catch((err) => {
        console.log(err);
    });
