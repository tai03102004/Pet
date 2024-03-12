const Product = require("../../models/Pet.model");
const productsHelper = require("../../helper/products");

// [GET] /

module.exports.index = async (req,res) => {
    const products = await Product.find ({
        status : "active",
        deleted : false,
    }).sort({position : "desc"})

    const newProducts = productsHelper.priceNewProducts(products);

    res.render('client/pages/home/index.pug',{
        pageTitle: "Home",
        products : newProducts, // các item là các id sản phẩm
    })
}