const apiurl = process.env.apiurl || require("../../config/env").api;

const jwtsecret =
  process.env.jwtsecret || require("../../config/env").jwtsecret;
const jwt = require("jsonwebtoken");
const User = require("../../models/users");
const bcrypt = require("bcryptjs");

exports.login = (req, res) => {
  console.log(req.body);

  User.findOne({ email: req.body.email })
    .then((doc) => {
      console.log(doc);

      var state = bcrypt.compareSync(req.body.password, doc.hash);

      console.log(state);

      if (state) {
        var token = jwt.sign(
          {
            email: doc.email,
            id: doc._id,
            type: "regular",
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
      res.status(401).json({ msg: "nouser" });
    });
};
