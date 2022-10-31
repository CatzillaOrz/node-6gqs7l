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
app.use('/admin', adminRoutes.routes);
app.use(shopRouter);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
    .sync({ force: true })
    .then((results) => {
        app.listen(8080);
    })
    .catch((err) => {
        console.log(err);
    });
