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
  district: {
    type: String,
  },
  address: {
    addressline1: { type: String },
    addressline2: { type: String },
    city: { type: String },
    district: { type: String },
    postalcode: { type: String },
    country: { type: String },
    aboutus: { type: String },
  },
  // orders: [
  //   {
  //     orderId: {
  //       type: String,
  //     },
  //     amount: {
  //       type: String,
  //     },
  //     date: {
  //       type: String,
  //     },
  //     orderStatus: {
  //       type: String,
  //     },
  //   },
  // ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
