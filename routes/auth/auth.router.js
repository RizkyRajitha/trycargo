const express = require("express");
const router = express.Router();
const authroutes = require("./auth.routes");

router.post("/logincustomer", authroutes.logincustomer);
router.post("/loginshopowner", authroutes.loginshopowner);

router.post("/forgotpasswordowner", authroutes.forgotPasswordowner);
router.post("/forgotpasswordcustomer", authroutes.forgotPasswordcustomer);

router.post("/resetpasswordowner", authroutes.resetpasswordowner);
router.post("/resetpasswordcustomer", authroutes.resetpasswordcustomer);

module.exports = router;
