const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/auth.controller");

const validate = require("../../validates/client/user.validete");

router.get("/login",controller.login);
router.post("/login",controller.loginPost);

router.get("/signup",controller.signup);
router.post("/signup",controller.signupPost);

router.get("/logout",controller.logout);

// router.get("/password/forgot",controller.forgotPassword);

module.exports = router;