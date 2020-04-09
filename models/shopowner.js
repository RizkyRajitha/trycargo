const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var shopownerSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
  },
  businessname: {
    type: String,
  },
  username: {
    type: String,
  },
  hash: {
    type: String,
  },
  tempotp: {
    type: String,
  },
  businessphone: {
    type: String,
  },
  businessaddress: {
    type: String,
  },
  businessdistrict: {
    type: String,
  },
  workinghours: {
    type: String,
  },
  items: [
    {
      itemId: {
        type: String,
        unique: true,
        required: true,
        dropDups: true,
      },
      unitprice: {
        type: String,
      },
      date: {
        type: String,
      },
      quantity: {
        type: String,
      },
    },
  ],
});

const ShopOwner = mongoose.model("ShopOwner", shopownerSchema);

module.exports = ShopOwner;
