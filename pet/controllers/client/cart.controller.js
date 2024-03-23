const Cart = require("../../models/cart.model");
const Product = require("../../models/Pet.model");

const productHelper = require("../../helper/products.js");
// [GET] /cart

module.exports.index = async(req,res) => {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id : cartId,
    });
    if (cart.products.length > 0) {
        for (const item of cart.products) {
            const productId = item.product_id;
            const productInfo = await Product.findOne({
                _id : productId,
            });
            productInfo.priceNew = productHelper.priceNewProduct(productInfo);
            
            item.productInfo = productInfo;
            item.totalPrice = item.quantity * productInfo.priceNew;
        }
    }
    else {
        res.clearCookie("cartId");
    }
    cart.totalPrice = cart.products.reduce( (sum,item)=> sum + item.totalPrice,0 )
    res.render("client/pages/cart/index",{
        pageTitle : "Giỏ hàng",
        cartDetail : cart,
    })
}

// [POST]/cart.add/:productId

module.exports.addPost = async(req,res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    req.body.quantity = 1;
    const quantity = parseInt(req.body.quantity);
    const userId = req.cookies.token;
    const cart = await Cart.findOne({
        _id : cartId,
    });
    // Tìm kiếm sản phẩm đã tồn tại hay chưa
    const existProductInCart = cart.products.find(item => item.product_id == productId);
    if (existProductInCart) {
        const newQuantity = quantity + existProductInCart.quantity;
        await Cart.updateOne(
            {
                _id : cartId,
                'products.product_id' : productId //- TODO : 'key.subkey'
            }, {
                'products.$.quantity' : newQuantity //- TODO : $ -> Để có thể truy cập đầy đủ phần từ đã được lọc
            }
        )
    } else {
        const objectCart = {
            product_id : productId,
            quantity : quantity,
        }
        await Cart.updateOne ({
            _id : cartId,
        },{
            $push: {products : objectCart} // Thêm product_id , quantity vào mảng products trong Cart
        })
        req.flash("success","Thêm sản phẩm vào giỏ hàng thành công! ");
    }
    res.redirect("back");
}

// [GET] /cart/delete/:productId

module.exports.delete = async(req,res) => {
    const productId = req.params.productId;

    const cartId = req.cookies.cartId;

    await Cart.updateOne ({
        _id : cartId,
    } ,{
        "$pull" : {products : {"product_id" : productId}} // Xoá các đối tượng có product_id trong products
    });

    req.flash("success" , "Đã xoá sản phẩm khỏi giỏ hàng !");

    res.redirect("back");
}
// [GET] /cart/update/:productId/:quantity

module.exports.update = async(req,res) => {
    const product_id = req.params.productId;
    const quantity = req.params.quantity;
    const cart_id = req.cookies.cartId;
    await Cart.updateOne({
        _id : cart_id,
        'products.product_id' : product_id,
    }, {
        'products.$.quantity' : quantity,
    })
    req.flash("success","Cập nhật giỏ hàng thành công");
    res.redirect("back");
}