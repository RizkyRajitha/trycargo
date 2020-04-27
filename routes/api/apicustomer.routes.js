const User = require("../../models/users");
const ShopOwner = require("../../models/shopowner");
const Order = require("../../models/orders");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid").v4;
const cloudinary = require("cloudinary").v2;
const cloudnmae =
  process.env.cloud_name || require("../../config/env").cloud_name;
const cloudinary_api_key =
  process.env.cloudinary_api_key ||
  require("../../config/env").cloudinary_api_key;

const cloudinary_api_secret =
  process.env.cloudinary_api_secret ||
  require("../../config/env").cloudinary_api_secret;

cloudinary.config({
  cloud_name: cloudnmae,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret,
});

exports.customerdashboard = (req, res) => {
  console.log("ownerdahsboard");
  var datain = req.body;
  console.log(datain);

  User.findOne({ _id: req.id })
    .then((doc) => {
      console.log(doc);

      Order.find({ customerId: req.id })
        .then((orders) => {
          orderData = orders.map((order) => ({
            items: order.items.map((item) => {
              itemdisp = item.itemName + "(" + item.quantity + "), ";
              return itemdisp;
            }),
            store: order.buisnessname,
            date: order.date,
            cost: order.totalprice,
            status: order.orderStatus,
          }));
          ShopOwner.find({ "address.district": doc.address.district })
            .then((shops) => {
              shopData = shops.map((shop) => ({
                id: shop.id,
                address: shop.address,
                email: shop.email,
                buisnessname: shop.buisnessname,
                buisnessphone: shop.buisnessphone,
                aboutus: shop.aboutus,
                workinghours: shop.workinghours,
                items: shop.items,
              }));
              temppayload = {
                orders: orderData,
                shops: shopData,
              };

              console.log(temppayload);
              res.status(200).json({ msg: "success", data: temppayload });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send("err");
            });
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

exports.customerdata = (req, res) => {
  User.findOne({ _id: req.id })
    .then((doc) => {
      var payload = {
        addressline1: doc.address.addressline1,
        addressline2: doc.address.addressline2,
        city: doc.address.city,
        district: doc.address.district,
        postalcode: doc.address.postalcode,
        phone: doc.phone,
      };

      console.log(payload);
      res.json(payload);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editprofile = (req, res) => {
  var datain = req.body;

  console.log(datain);

  User.findOneAndUpdate(
    { _id: req.id },
    {
      $set: {
        "address.addressline1": datain.addressline1,
        "address.addressline2": datain.addressline2,
        "address.city": datain.city,
        "address.district": datain.district,
        "address.postalcode": datain.postalcode,
        
        phone: datain.phone,
      },
    }
  )
    .then((doc) => {
      console.log(doc);
      res.json({ msg: "success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "err" });
    });
};

exports.neworder = (req, res) => {
  console.log("new order");
  var datain = req.body;
  console.log(datain);
  const orderId = uuid();

  User.findOne({ _id: req.id })
    .then((doc) => {
      // console.log(doc);

      var neworder = new Order({
        ownerId: datain.ownerId,
        customerId: req.id,
        orderId: orderId,
        date: new Date().toISOString(),
        buisnessname: datain.buisnessname,
        customeraddress: datain.customeraddress,
        totalprice: datain.totalprice,
        orderStatus: "pending",
        items: datain.items,
      });

      neworder
        .save()
        .then((doc2) => {
          console.log(doc2);
          neworder = {
            items: doc2.items,
            store: doc2.buisnessname,
            date: doc2.date,
            cost: doc2.totalprice,
            status: doc2.orderStatus,
          };
          res.status(200).json({ msg: "success", data: neworder });
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
