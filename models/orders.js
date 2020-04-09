const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var orderSchema = new Schema({
  orderId: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
  },
  items: [
    {
      itemId: {
        type: String,
      },
      unitprice: {
        type: String,
      },
      quantity: {
        type: String,
      },
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
