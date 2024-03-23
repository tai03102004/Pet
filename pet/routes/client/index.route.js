const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");
const cartRoutes = require("./cart.route");
const checkoutRoute = require("./checkout.route");
const searchRoute = require("./search.route");
const authRoute = require("./auth.route");
const aboutRoute = require("./about.route");
const contactRoute = require("./contact.route");

// middlewares
const cartMiddleware = require("../../middlewares/client/cart.middlewares");
const authMiddleware = require("../../middlewares/client/auth.middlewares");
const userMiddleware = require("../../middlewares/client/user.middlewares");

module.exports = (app) => {
    app.use(cartMiddleware.cartId);
    app.use("/",authMiddleware.requireAuth,homeRoutes);
    app.use("/products",authMiddleware.requireAuth, productRoutes);
    app.use("/cart",userMiddleware.requireAuth,authMiddleware.requireAuth, cartRoutes);
    app.use("/checkout",userMiddleware.requireAuth,authMiddleware.requireAuth,checkoutRoute);
    app.use("/search",authMiddleware.requireAuth,searchRoute);
    app.use("/auth",authRoute);
    app.use("/about",aboutRoute);
    app.use("/contact",contactRoute);
}