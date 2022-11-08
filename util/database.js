const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://catzilla:catzilla@cluster0.3wuapxa.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("mongodb connected");
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) return _db;
  throw "Database not found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
