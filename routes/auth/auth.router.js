const express = require("express");
const router = express.Router();
const authroutes = require("./auth.routes");
const jwt = require("jsonwebtoken");

const jwtsecret =
  process.env.jwtsecret || require("../../config/env").jwtsecret;

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

router.post("/logincustomer", authroutes.logincustomer);
router.post("/loginshopowner", authroutes.loginshopowner);

router.post("/forgotpasswordowner", authroutes.forgotPasswordowner);
router.post("/forgotpasswordcustomer", authroutes.forgotPasswordcustomer);

router.post("/resetpasswordowner", authroutes.resetpasswordowner);
router.post("/resetpasswordcustomer", authroutes.resetpasswordcustomer);

router.post("/changepasswordowner", jwthelperowner, authroutes.changePassowner);
router.post(
  "/changepasswordcustomer",
  jwthelpercustomer,
  authroutes.changePassuser
);

module.exports = router;
