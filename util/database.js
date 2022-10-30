const Sequelize = require("sequelize"); // dependence -> ('mysql2')

const sequlize = new Sequelize("node-complete", "root", "catzilla", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequlize;
