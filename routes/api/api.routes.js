const User = require("../../models/users");
const ShopOwner = require("../../models/shopowner");
const Order = require("../../models/orders");

exports.ownerdashboard = (req, res) => {
  console.log("ownerdahsboard");
  var datain = req.body;
  console.log(datain);

  ShopOwner.findOne({ _id: req.id })
    .then((doc) => {
      console.log(doc);

      Order.findOne({ ownerId: req.id })
        .then((doc2) => {
          temppayload = {
            businessname: doc.businessname,
            username: doc.username,
            items: doc.items,
            orders: doc2,
          };

          res.status(200).json({ msg: "success", data: temppayload });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("err");
    });
};

exports.customerdashboard = (req, res) => {
  console.log("ownerdahsboard");
  var datain = req.body;
  console.log(datain);

  User.findOne({ _id: req.id })
    .then((doc) => {
      console.log(doc);

      Order.findOne({ customerId: req.id })
        .then((doc2) => {
          temppayload = {
            name: doc.firstName + " " + doc.lastName,
            district: doc.district,
            orders: doc2,
          };

          res.status(200).json({ msg: "success", data: temppayload });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("err");
    });
};

exports.neworder = (req, res) => {
  console.log("new order");
  var datain = req.body;
  console.log(datain);

  User.findOne({ _id: req.id })
    .then((doc) => {
      console.log(doc);

var neworder = new Order({
    
})

      Order.findOne({ customerId: req.id })
        .then((doc2) => {
          temppayload = {
            name: doc.firstName + " " + doc.lastName,
            district: doc.district,
            orders: doc2,
          };

          res.status(200).json({ msg: "success", data: temppayload });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("err");
    });
};
