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
<<<<<<< HEAD
=======
    type: String,
  },
  aboutus: {
>>>>>>> 1f0a0f112d2f876a1b84a1aa69fc02a6da1a4812
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
  buisnessaddress: {
    type: String,
  },
  buisnessdistrict: {
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
