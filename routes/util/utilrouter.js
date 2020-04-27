const express = require("express");
const router = express.Router();
const utilroutes = require("./util");

router.get("/getdistrictlist", utilroutes.getdistrictlist);


module.exports = router;
