const express = require("express");
const router = express.Router();
const path = require("path");
const apiroutes = require("./apicustomer.routes");

router.get("/customerdashboard", apiroutes.customerdashboard);

module.exports = router;
