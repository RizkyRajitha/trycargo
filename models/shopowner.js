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
    unique: true,
    required: true,
    dropDups: true,
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
      },
      unitprice: {
        type: String,
      },
      date: {
        type: String,
      },
      discription: {
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
