const apiurl = process.env.apiurl || require("../../config/env").api;

const jwtsecret =
  process.env.jwtsecret || require("../../config/env").jwtsecret;
const sendgridkey =
  process.env.sendgridkey || require("../../config/env").sendgridkey;


const jwt = require("jsonwebtoken");
const User = require("../../models/users");
const ShopOwner = require("../../models/shopowner");
const bcrypt = require("bcryptjs");

exports.logincustomer = (req, res) => {
  console.log(req.body);

  User.findOne({ email: req.body.email })
    .then((doc) => {
      console.log(doc);

      if (doc) {
        var state = bcrypt.compareSync(req.body.password, doc.hash);

        console.log(state);

        if (state) {
          var token = jwt.sign(
            {
              email: doc.email,
              id: doc._id,
              type: "customer",
            },
            jwtsecret,
            { expiresIn: "600m" }
          );

          res.status(200).json({ msg: "success", token: token });
        } else {
          res.status(401).json({ msg: "invalidcredentials" });
        }
      } else {
        res.status(401).json({ msg: "nouser" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error");
    });
};

exports.loginshopowner = (req, res) => {
  console.log(req.body);

  ShopOwner.findOne({ email: req.body.email })
    .then((doc) => {
      console.log(doc);

      var state = bcrypt.compareSync(req.body.password, doc.hash);

      console.log(state);

      if (state) {
        var token = jwt.sign(
          {
            email: doc.email,
            id: doc._id,
            type: "owner",
          },
          jwtsecret,
          { expiresIn: "600m" }
        );

        res.status(200).json({ msg: "success", token: token });
      } else {
        res.status(401).json({ msg: "invalidcredentials" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ msg: "nouser" });
    });
};

exports.forgotPassword = (req, res) => {
  var email = req.body.email;

  console.log("in forgot password");
  User.findOne({ email: email })
    .then((result) => {
      if (!result) {
        console.log(result + "not found error");
        res.status(200).json({ msg: "nouser" });
      } else {
        var payload = {
          id: result._id,
          prehash: result.hash,
        };

        var token = jwt.sign(payload, jwtsecret, {
          expiresIn: "5m", // send this to env.js file todo
        });

        sgMail.setApiKey(sendgridkey);
        const msg = {
          to: result.email,
          from: "support@airshare.com",
          subject: "RESET PASSWORD",
          templateId: "d-07807a10af4f42a1be9b9502464c6886",
          dynamic_template_data: {
            name: result.userName,
            msg: `${apiurl}resetpassword/${token}`,
            date: new Date().toUTCString(),
            uniqeid: Math.floor(Math.random() * 1000000000),
          },
        };
        sgMail
          .send(msg)
          .then((result) => {
            console.log("email sent");
            // console.log(result[0]._id);
            res.status(200).json({ msg: "success" });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "servererr" });
          });
      }
    })
    .catch((err) => {
      console.log("error - - - " + err);
      res.send("no_user_found");
    });
};

exports.resetpassword = (req, res) => {
  // id = req.body.id;
  newpassword = req.body.password;
  passresetjwt = req.body.token;

  console.log(req.body);

  try {
    var decode = jwt.verify(passresetjwt, jwtsecret);
    console.log("decode jwt - " + JSON.stringify(decode));

    var id = decode.id;

    User.findOne({ _id: id })
      .then((result) => {
        if (result.hash === decode.prehash) {
          console.log("hash verified");
          console.log("found " + result.email);

          var salt = bcrypt.genSaltSync(saltRounds);
          var hash = bcrypt.hashSync(newpassword, salt);

          User.findOneAndUpdate(
            { _id: id },
            {
              $set: {
                hash: hash,
              },
            }
          )
            .then((doc) => {
              console.log("password changed succesfully");
              res.status(200).json({ msg: "success" });
            })
            .catch((err) => {
              console.log(err);
              console.log();
              res.status(500).json({ msg: "tokenerr" });
            });
        } else {
          console.log("hash error");
          res.status(200).json({ msg: "tokendisbled" });
        }
      })
      .catch((err) => {
        console.log(err);
        // res.send("error");
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "tokenerr" });
  }

  console.log(id);
  console.log(newpassword);
  // res.send("hahahaha  " + id);
};
