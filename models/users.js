const mongoose = require("mongoose");


saltRounds = 10;

var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  hash: {
    type: String,
  },
  tempotp: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
