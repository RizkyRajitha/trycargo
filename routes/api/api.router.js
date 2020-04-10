const express = require("express");
const router = express.Router();

const apiroutes = require("./api.routes");

router.get("/ownerdashboard", apiroutes.ownerdashboard);
router.get("/customerdashboard", apiroutes.customerdashboard);
router.post("/addnewitem", apiroutes.addnewitem);

module.exports = router;
