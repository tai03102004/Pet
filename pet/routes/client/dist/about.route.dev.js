"use strict";

var express = require('express');

var router = express.Router();

var controller = require("../../controllers/client/about.controller");

router.get("/", controller.index);
module.exports = router;