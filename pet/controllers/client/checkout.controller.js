const Cart = require("../../models/cart.model");
const Order = require("../../models/order.model");
const Product = require("../../models/Pet.model");
const productHelper = require("../../helper/products");

// [GET] /checkout
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
            })
            // productInfo : Thông tin chó mà mình mua...
            productInfo.priceNew = await productHelper.priceNewProduct(productInfo);
            item.productInfo = productInfo;
            item.totalPrice = item.quantity * productInfo.priceNew;
        }
    }
    cart.totalPrice = cart.products.reduce((totalPrice, item) => totalPrice + item.totalPrice,0);
    res.render("client/pages/checkout/index",{
        pageTitle : "Đặt hàng",
        cartDetail : cart,
    })
}

// [POST] /checkout/order

module.exports.order = async(req,res) => {
    const cartId = req.cookies.cartId;
    const userInfo = req.body;

    const cart = await Cart.findOne({
        _id : cartId,
    });

    let products = [];

    for (const product of cart.products) {
        const objectProduct = {
            product_id : product.product_id,
            price : 0,
            discountPercentage : 0,
            quantity : product.quantity,
        };

        const productInfo = await Product.findOne({
            _id : product.product_id
        });
        objectProduct.price = productInfo.price;
        objectProduct.discountPercentage = productInfo.discountPercentage;

        products.push(objectProduct);
    }

    const objectOrder = {
        cart_id : cartId,
        userInfo : userInfo,
        products : products
    };

    const order = new Order(objectOrder);
    await order.save();
    // Sau khi lưu products vào Order => success => gán products = [] => Lưu sp khác
    await Cart.updateOne({
        _id : cartId,
    },{
        products : []
    })
    res.redirect(`/checkout/success/${order.id}`);
}

// [GET] / checkout/success/:orderId
module.exports.success = async(req,res) => {
    const orderId = req.params.orderId;
    const order = await Order.findOne({
        _id : orderId,
    });
    
    for (const item of order.products) {
        const productInfo = await Product.findOne({
            _id : item.product_id,
        }).select("title thumbnail");

        item.productInfo = productInfo;
        item.priceNew =  productHelper.priceNewProduct(item);
        item.totalPrice = item.priceNew * item.quantity ;
    }

    order.totalPrice = order.products.reduce((item, price) => item + price.totalPrice ,0 );

    res.render("client/pages/checkout/success",{
        pageTitle : "Đặt hàng thành công",
        order : order,
    })
}