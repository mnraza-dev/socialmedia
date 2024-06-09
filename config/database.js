const mongoose = require("mongoose");
const { MONGO_URL } = process.env;

exports.connect = () => {
  mongoose
    .coonect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB connection successfull !"))
    .catch((err) => {
      console.log("DB connection failed !", err);
      process.exit(1);
    });
};
