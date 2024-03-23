"use strict";

var express = require("express");

var router = express.Router();

var controller = require("../../controllers/client/auth.controller");

var validate = require("../../validates/client/user.validete");

router.get("/login", controller.login);
router.post("/login", controller.loginPost);
router.get("/signup", controller.signup);
router.post("/signup", controller.signupPost);
router.get("/logout", controller.logout); // router.get("/password/forgot",controller.forgotPassword);

module.exports = router;