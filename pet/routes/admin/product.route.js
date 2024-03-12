const express = require('express');

const multer = require('multer');
const router = express.Router();

// upload()
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares.js");
const controller = require("../../controllers/admin/product.controller");
const validateProduct = require("../../validates/admin/product.validate");

router.get("/",controller.index);

// Thay đổi trạng thái sản phẩm
router.patch("/change-status/:status/:id", controller.changeStatus); // Cập nhật trạng thái active or inactive

// Thay đổi trạng thái nhiều sản phẩm
router.patch("/change-multi", controller.changeMulti);

// Xoá 1 sản phẩm
router.delete("/delete/:id", controller.deleteItem);

// Thêm 1 sản phẩm
router.get("/create",controller.create);
router.post("/create"
            ,upload.single("thumbnail")
            ,uploadCloud.upload
            ,validateProduct.createPost
            ,controller.createPost
        );

// Sửa 1 sản phẩm
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id"
            ,upload.single("thumbnail")
            ,uploadCloud.upload // upload ảnh
            ,validateProduct.createPost // validate tiêu đề
            ,controller.editPost 
);

// Chi tiết 1 sản phẩm
router.get("/detail/:id", controller.details);
router.patch("/detail/:status/:id",controller.detailsPatch);

module.exports = router;