const express = require("express");
const router = express.Router();
const registerroutes = require("./register.routes");

router.post("/signupcustomer", registerroutes.signupcustomer);
router.post("/signupowner", registerroutes.signupowner);
router.post("/chechusername", registerroutes.chechusername);
router.post("/shopdashbaord", registerroutes.shopdashboard);

module.exports = router;
