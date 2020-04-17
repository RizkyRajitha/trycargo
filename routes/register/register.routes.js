const User = require("../../models/users");
const ShopOwner = require("../../models/shopowner");

const bcrypt = require("bcryptjs");
const saltRounds = 10;

const jwtsecret =
  process.env.jwtsecret || require("../../config/env").jwtsecret;

exports.signupcustomer = (req, res) => {
  console.log("signup customer");
  var datain = req.body;
  console.log(datain);

  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(datain.password, salt);

  console.log("hash - " + hash);

  var newuser = new User({
    email: datain.email,
    phone: datain.phone,
    firstName: datain.firstName,
    lastName: datain.lastName,
    address: {
      buisnessphone: datain.buisnessphone,
      addressline1: datain.addressline1,
      addressline2: datain.addressline2,
      city: datain.city,
      district: datain.district,
      postalcode: datain.postalcode,
      country: datain.country,
    },
    hash: hash,
  });

  newuser
    .save()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({ msg: "success" });
      // dbx.filesCreateFolder({
      //   path: "/" + datain.username,
      //   autorename: false
      // });
    })
    .catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        console.log("duplicate user");
        res.status(200).json({ msg: "dupuser" });
      } else {
        res.status(400).json(err);
      }
    });
};

exports.signupowner = (req, res) => {
  console.log("signup");
  var datain = req.body;
  console.log(datain);

  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(datain.password, salt);

  console.log("hash - " + hash);

  var newuser = new ShopOwner({
    email: datain.email,
    phone: datain.phone,
    buisnessname: datain.buisnessname,
    username: datain.username,
    hash: hash,
    address: {
      buisnessphone: datain.buisnessphone,
      addressline1: datain.addressline1,
      addressline2: datain.addressline2,
      city: datain.city,
      district: datain.district,
      postalcode: datain.postalcode,
      country: datain.country,
    },
    aboutus: datain.aboutus,
  });

  newuser
    .save()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({ msg: "success" });
      // dbx.filesCreateFolder({
      //   path: "/" + datain.username,
      //   autorename: false
      // });
    })
    .catch((err) => {
      if (err.code === 11000) {
        console.log("duplicate user");
        res.status(200).json({ msg: "dupuser" });
      }
    });
};

exports.chechusername = (req, res) => {
  console.log(req.body);

  ShopOwner.findOne({ userName: req.body.username })
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json({ msg: "invalid" });
      } else {
        res.status(200).json({ msg: "valid" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.shopdashboard = (req, res) => {
  console.log(" shop dashbaord ");
  var datain = req.body;
  console.log(datain);

  // const orderId = uuid();

  ShopOwner.findOne({ username: datain.username })
    .then((doc) => {
      console.log(doc);
      res.status(200).json(doc.items);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("err");
    });
};
