"use strict";

var homeRoutes = require("./home.route");

var productRoutes = require("./product.route");

var cartRoutes = require("./cart.route");

var checkoutRoute = require("./checkout.route");

var searchRoute = require("./search.route");

var authRoute = require("./auth.route");

var aboutRoute = require("./about.route");

var contactRoute = require("./contact.route"); // middlewares


var cartMiddleware = require("../../middlewares/client/cart.middlewares");

var authMiddleware = require("../../middlewares/client/auth.middlewares");

var userMiddleware = require("../../middlewares/client/user.middlewares");

module.exports = function (app) {
  app.use(cartMiddleware.cartId);
  app.use("/", authMiddleware.requireAuth, homeRoutes);
  app.use("/products", authMiddleware.requireAuth, productRoutes);
  app.use("/cart", userMiddleware.requireAuth, authMiddleware.requireAuth, cartRoutes);
  app.use("/checkout", userMiddleware.requireAuth, authMiddleware.requireAuth, checkoutRoute);
  app.use("/search", authMiddleware.requireAuth, searchRoute);
  app.use("/auth", authRoute);
  app.use("/about", aboutRoute);
  app.use("/contact", contactRoute);
};