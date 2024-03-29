const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();

const controller = require("../../controllers/admin/auth.controller.js");

// upload ảnh vào cloudinary
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares");

router.get("/login",controller.login);

// đăng nhập
router.post("/login",uploadCloud.upload,controller.loginPost);

// đăng xuất
router.get("/logout",controller.logout);

module.exports = router;