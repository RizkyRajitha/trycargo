const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var shopownerSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
  },
  buisnessname: {
    type: String,
  },
  aboutus: {
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
  buisnessphone: {
    type: String,
  },
  address: {
    addressline1: { type: String },
    addressline2: { type: String },
    city: { type: String },
    district: { type: String },
    postalcode: { type: String },
    country: { type: String },
  },
  aboutus: {
    type: String,
  },
  workinghours: {
    type: String,
  },
  aboutus: {
    type: String,
  },
  items: [
    {
      itemId: {
        type: String,
      },
      itemName: {
        type: String,
      },
      unitPrice: {
        type: String,
      },
      addeddate: {
        type: String,
      },
      updateddate: {
        type: String,
      },
      discription: {
        type: String,
      },
      quantity: {
        type: String,
      },
      imgurl: {
        type: String,
      },
    },
  ],
});

const ShopOwner = mongoose.model("ShopOwner", shopownerSchema);

module.exports = ShopOwner;
