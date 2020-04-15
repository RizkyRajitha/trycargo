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
            // buisnessname: doc.buisnessname,
            // username: doc.username,
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

<<<<<<< HEAD:routes/api/api.routes.js
exports.customerdashboard = (req, res) => {
  console.log("customerdahsboard");
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

      var neworder = new Order({});

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

=======
>>>>>>> 1f0a0f112d2f876a1b84a1aa69fc02a6da1a4812:routes/api/apiowner.routes.js
exports.addnewitem = (req, res) => {
  console.log("new order");
  var datain = req.body;
  console.log(datain);
  console.log(req.file);

  const itemuuid = uuid();
  console.log(itemuuid);

  fileupcloud(itemuuid, req.file.path)
    .then((url) => {
      console.log(url);
      // res.send(url);

      ShopOwner.findOneAndUpdate(
        { _id: req.id },
        {
          $push: {
            items: {
              itemName: datain.itemName,
              itemId: itemuuid,
              unitprice: datain.unitprice,
              addeddate: new Date().toISOString(),
              updateddate: new Date().toISOString(),
              discription: datain.discription,
              quantity: datain.quantity,
              imgurl: url,
            },
          },
        }
      )
        .then((doc) => {
          console.log(doc);

          res.status(200).json({ msg: "success", data: doc.items });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("err");
        });
    })
    .catch((err) => console.log(err));
};

exports.editowner = (req, res) => {
  console.log("edit owner");
  var datain = req.body;
  console.log(datain);
  console.log(req.file);

  ShopOwner.findOneAndUpdate(
    { _id: req.id },
    {
      $set: {
        buisnessname: datain.buisnessname,
        aboutus: datain.aboutus,
        buisnessphone: datain.buisnessphone,
        buisnessaddress: datain.buisnessaddress,
        buisnessdistrict: datain.buisnessdistrict,
        workinghours: datain.workinghours,
      },
    }
  )
    .then((doc) => {
      console.log(doc);

      res.status(200).json({ msg: "success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("err");
    });
};







exports.acceptorder = (req, res) => {
  console.log("accept order");
  var datain = req.body;
  console.log(datain);
};

const fileupcloud = function (filename, path) {
  console.log("cloud");
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      {
        tags: "basic_sample",
        folder: "trycargo/",
        public_id: filename,
        sign_url: true,
      },
      function (err, cvuploaddata) {
        console.log();
        console.log("** File Upload");
        if (err) {
          console.warn(err);
          reject(err);
        }
        console.log(
          "* public_id for the uploaded pdf is generated by Cloudinary's service."
        );
        console.log("* " + cvuploaddata.public_id);
        console.log("* " + cvuploaddata.url);

        var cvhttps =
          cvuploaddata.url.slice(0, 4) +
          "s:" +
          cvuploaddata.url.slice(5, cvuploaddata.url.length);

        resolve(cvhttps);

        fs.unlinkSync(path);
      }
    );
  });
};
