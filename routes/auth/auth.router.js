    const express = require("express");
    const router = express.Router();
    const authroutes = require("./auth.routes");

    router.post("/logincustomer", authroutes.logincustomer);
    router.post("/loginshopowner", authroutes.loginshopowner);
    
    router.post("/forgotpassword", authroutes.forgotPassword);
    router.post("/resetpassword", authroutes.resetpassword);

    module.exports = router;
