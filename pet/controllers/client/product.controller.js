const Product = require("../../models/Pet.model");
const productsHelper = require("../../helper/products");
const paginationHelper = require("../../helper/pagination");

// [GET] /products

module.exports.index = async(req,res) => {
    // Pagination

    let initPagination = {
        currentPage : 1, // Trang bắt đầu
        limitItems : 4 // Giới hạn 1 trang 
    }
    let find = {
        deleted : false,
        status : "active",
    };

    const countProducts = await Product.countDocuments(find); // Tổng sản phẩm
    const objectPagination = paginationHelper(initPagination, req.query,countProducts); 
    
    // End Pagination

    const products = await Product.find ({
        status : "active",
        deleted : false,
    }).sort({position : "desc"})
    .limit(objectPagination.limitItems) // Giới hạn 1 trang số sản phẩm hiển thị
    .skip(objectPagination.skip);;

    
    const newProducts = productsHelper.priceNewProducts(products);

    res.render("client/pages/products/index.pug",{
        pageTitle : "Danh sách sản phẩm",
        pagination : objectPagination,
        products : newProducts, // các item là các id sản phẩm
    })
}