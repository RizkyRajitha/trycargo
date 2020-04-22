const express = require("express");
const router = express.Router();
const path = require("path");
const apiroutes = require("./apiowner.routes");

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var path2img = path.resolve(__dirname, "assets");
    cb(null, path2img); // here we specify the destination . in this case i specified the current directory
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname); // here we specify the file saving name . in this case i specified the original file name
  },
});
const fileup = multer({ storage: storage });

router.get("/ownerdashboard", apiroutes.ownerdashboard);
router.post("/addnewitem", fileup.single("resobj"), apiroutes.addnewitem);
router.post("/owneredit", apiroutes.editowner);
router.post("/edititem", fileup.single("resobj"), apiroutes.edititem);

module.exports = router;
