const Cart = require("../../models/cart.model");

module.exports.cartId = async(req,res,next) => {
    if (!req.cookies.cartId) {
        const cart = new Cart();
        await cart.save();

        const expiresTime = 1000 * 60 * 60 * 24 * 365; // 1 year

        res.cookie("cartId",cart.id,{
            expires : new Date(Date.now() + expiresTime)
        })
    } else {
        
        const cart = await Cart.findOne({
            _id : req.cookies.cartId,
        });
        if (cart) {
            cart.totalQuantity = cart.products.reduce((sum,product) => sum + product.quantity,0);

            res.locals.miniCart = cart;
        }
    }
    next();
}