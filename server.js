const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");

const bp = require("body-parser");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(require("morgan")("dev"));

const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
//"mongodb://127.0.0.1:27017/authdb" ||
const mongodbAPI = process.env.mongourl || require("./config/env").mongodbAPI; //keys.mongouri;
app.use(require("morgan")("dev"));
const jwtsecret = process.env.jwtsecret || require("./config/env").jwtsecret;

var jwthelperowner = (req, res, next) => {
  console.log("helper .....");
  const token = req.headers.authorization;
  //  req.body.token || req.query.token || req.headers['x-access-token']
  // decode token
  // console.log(token);
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, jwtsecret, function (err, decoded) {
      if (err) {
        console.log(err);
        return res
          .status(401)
          .json({ error: true, message: "unauthorized_access" });
      }

      if (decoded.type === "owner") {
        console.log("helper oK");
        req.id = decoded.id;
        next();
      } else {
        console.log("wrong user");
        return res
          .status(401)
          .json({ error: true, message: "unauthorized_access" });
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      error: true,
      message: "no_token_provided.",
    });
  }
};

var jwthelpercustomer = (req, res, next) => {
  console.log("helper .....");
  const token = req.headers.authorization;
  //  req.body.token || req.query.token || req.headers['x-access-token']
  // decode token
  // console.log(token);
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, jwtsecret, function (err, decoded) {
      if (err) {
        console.log(err);
        return res
          .status(401)
          .json({ error: true, message: "unauthorized_access" });
      }

      if (decoded.type === "customer") {
        console.log("helper oK");
        req.id = decoded.id;
        next();
      } else {
        console.log("wrong user");
        return res
          .status(401)
          .json({ error: true, message: "unauthorized_access" });
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      error: true,
      message: "no_token_provided.",
    });
  }
};

app.use("/auth", require("./routes/auth/auth.router")); //dont add jwt middleware
app.use("/reg", require("./routes/register/register.router")); //dont add jwt middleware

app.use(
  "/apicustomer",
  jwthelpercustomer,
  require("./routes/api/apicustomer.router")
);
app.use("/apiowner", jwthelperowner, require("./routes/api/apiowner.router"));

try {
  mongoose.connect(
    mongodbAPI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (!err) console.log("connected to mongodb sucsessfully" + "👍");
    }
  );
} catch (error) {
  console.log(err);
}

app.listen(port, () => {
  console.log("listsing on " + port);
});
