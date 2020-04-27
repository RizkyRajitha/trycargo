const express = require("express");
const router = express.Router();
const path = require("path");
const apiroutes = require("./apicustomer.routes");

router.get("/customerdashboard", apiroutes.customerdashboard);
router.post("/neworder", apiroutes.neworder);
router.post("/editprofile", apiroutes.editprofile);
router.get("/customerdata", apiroutes.customerdata);

module.exports = router;
