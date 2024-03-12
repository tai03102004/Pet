// Sản phẩm
const petProduct = require("../../models/Pet.model");

// Danh mục sản phẩm
const ProductCategory = require("../../models/Pet-category.model");

// Tài khoản Admin
const accountAdmin = require("../../models/account.model");

// Người dùng bên client
const userClient = require("../../models/auth.model");

// [GET] /admin/dashboard

module.exports.dashboard = async(req,res) => {
    // Thống kế 
    const statistic = {
        // Danh sách sản phẩm
        categoryProduct: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        // Sản phẩm
        petProduct: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        // Tài khoản ADMIN
        account: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        // Người dùng CLIENT
        user: {
            total: 0,
            active: 0,
            inactive: 0,
        },
    };
    // Danh mục sản phẩm

    // Đếm tổng số danh mục sản phảm
    statistic.categoryProduct.total = await ProductCategory.countDocuments({
        deleted: false
    });
    // Đếm tài khoản hoạt động
    statistic.categoryProduct.active = await ProductCategory.countDocuments({
        status: "active",
        deleted: false
    });
    // Đếm tài khoản ko hoạt động
    statistic.categoryProduct.inactive = await ProductCategory.countDocuments({
        status: "inactive",
        deleted: false
    });

    // Sản phẩm
    // Tổng sản phẩm
    statistic.petProduct.total = await petProduct.countDocuments({
        deleted: false,
    })
    // Sản phẩm hoạt động
    statistic.petProduct.active = await petProduct.countDocuments({
        static:"active",
        deleted: false,
    })
    // Sản phẩm dừng hoạt động
    statistic.petProduct.inactive = await petProduct.countDocuments({
        static:"inactive",
        deleted: false,
    })

    // Tài khoản admin
    // Tổng Tài khoản
    statistic.account.total = await accountAdmin.countDocuments({
        deleted: false,
    })
    // Tài khoản hoạt động
    statistic.account.active = await accountAdmin.countDocuments({
        static:"active",
        deleted: false,
    })
    // Tài khoản dừng hoạt động
    statistic.account.inactive = await accountAdmin.countDocuments({
        static:"inactive",
        deleted: false,
    })
    // if (userClient) {
        // Tài khoản client

        // // Tổng Tài khoản
        // statistic.user.total = await userClient.countDocuments({
        //     deleted: false,
        // })
        // // Tài khoản hoạt động
        // statistic.user.active = await userClient.countDocuments({
        //     static:"active",
        //     deleted: false,
        // })
        // // Tài khoản dừng hoạt động
        // statistic.user.inactive = await userClient.countDocuments({
        //     static:"inactive",
        //     deleted: false,
        // })
    // }
    res.render("admin/pages/dashboard/index", {
        pageTitle : "Tổng quan",
        statistic : statistic
    })
}