    const express = require("express");
    const router = express.Router();
    const authroutes = require("./auth.routes");

    router.post("/login", authroutes.login);


    module.exports = router;
