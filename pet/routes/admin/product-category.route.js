const express = require("express");

const multer = require("multer");
const router = express.Router();

const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares.js");
const controller = require("../../controllers/admin/product-category.controller");
const validateProduct = require("../../validates/admin/product.validate");

// admin/product-category
router.get("/",controller.index);

// Thay đổi trạng thái sản phẩm
router.patch("/change-status/:status/:id", controller.changeStatus); // Cập nhật trạng thái active or inactive

// Create Product Category
router.get("/create",controller.create);
router.post("/create"
            ,upload.single("thumbnail") // upload ảnh
            ,uploadCloud.upload // text kiểu word  
            ,controller.createPost
);

// Edit Product Category
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",
            upload.single("thumbnail"), // upload
            uploadCloud.upload, // text
            controller.editPatch
)

// Detail Product Category
router.get("/detail/:id",controller.detail);
router.patch("/detail/:status/:id",controller.detailsPatch);

// Delete Product Category
router.delete("/delete/:id",controller.deleteItem);

module.exports = router;