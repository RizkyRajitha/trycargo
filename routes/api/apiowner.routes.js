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

// DANGER! This is insecure. See http://twil.io/secure
const accountSid = require("../../config/env").twilliosid;
const authToken = require("../../config/env").twilliotoken;
const smsclient = require("twilio")(accountSid, authToken);

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
              unitPrice: datain.unitPrice,
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
  // console.log(req.file);

  ShopOwner.findOneAndUpdate(
    { _id: req.id },
    {
      $set: {
        email: datain.email,
        phone: datain.phone,
        buisnessname: datain.buisnessname,
        username: datain.username,
        buisnessphone: datain.buisnessphone,
        address: {
          addressline1: datain.addressline1,
          addressline2: datain.addressline2,
          city: datain.city,
          district: datain.district,
          postalcode: datain.postalcode,
          country: datain.country,
        },
        aboutus: datain.aboutus,
      },
    }
  )
    .then((doc) => {
      console.log(doc);

      res.status(200).json({ msg: "success", data: doc });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("err");
    });
};

exports.changeorderstatus = (req, res) => {
  console.log("accept order");
  var datain = req.body;
  console.log(datain);

  Order.findOneAndUpdate(
    { _id: datain.orderid },
    {
      $set: {
        orderStatus: datain.status,
      },
    }
  )
    .then((orderDoc) => {
      res.json({ msg: "success" });

      ShopOwner.findOne({ _id: orderDoc.ownerId })
        .then((ownerDoc) => {
          User.findOne({ _id: orderDoc.customerId })
            .then((customerdoc) => {
              if (datain.status === "accepted") {
                client.messages
                  .create({
                    body: `Hi ${customerdoc.firstName} \nyour order ${orderDoc.orderId} is confirmed\n please dial ${ownerDoc.buisnessphone} for further verifications \n${ownerDoc.buisnessname}`,
                    from: require("../../config/env").twilliophonumber,
                    to: require("../../config/env").customernumber,
                  })
                  .then((message) => console.log(message.sid));
              }
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    })
    .catch((err) => {});
};

exports.edititem = (req, res) => {
  console.log("edit item");
  var datain = req.body;
  console.log(datain);

  cloudinary.uploader.destroy("trycargo/" + datain.itemid, function (
    error,
    result
  ) {
    if (err) {
      console.log(error);
    } else {
      console.log(result);
      fileupcloud(datain.itemid, req.file.path)
        .then((url) => {
          ShopOwner.findOneAndUpdate(
            { _id: req.id, "items.itemId": datain.itemid },
            {
              $set: {
                "item.$.itemName": datain.itemName,
                "item.$.unitPrice": datain.unitPrice,
                "item.$.updateddate": new Date().toISOString(),
                "item.$.discription": datain.discription,
                "item.$.quantity": datain.quantity,
                "item.$.imgurl": url,
              },
            }
          )
            .then((docs) => {
              console.log(docs);
              res.status(200).json({ msg: "success" });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  });
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
