const systemConfig = require("../../config/system");

const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const productCategoryRoutes = require("./product-category.route");
const settingRoutes = require("./setting.route");
const changeLanguageRoutes = require("./change-language.route");
const roleRoutes = require("./roles.route");
const accountRoutes = require("./account.route");
const myAccountRoutes = require("./my-account.route");
const authRoutes = require("./auth.route");

const authMiddleware = require("../../middlewares/admin/auth.middlewares");
const authController  = require("../../controllers/admin/auth.controller.js");

module.exports = (app) => {
    const PATH_ADMIN = "/" + systemConfig.prefixAdmin;

    app.get(PATH_ADMIN, authController.login);

    app.use(PATH_ADMIN + "/dashboard",authMiddleware.requireAuth,dashboardRoutes);
    app.use(PATH_ADMIN + "/products",authMiddleware.requireAuth,productRoutes);
    app.use(PATH_ADMIN + "/products-category" ,authMiddleware.requireAuth, productCategoryRoutes);
    app.use(PATH_ADMIN + "/settings",authMiddleware.requireAuth,settingRoutes);
    app.use(PATH_ADMIN + "/change-language",authMiddleware.requireAuth,changeLanguageRoutes);
    app.use(PATH_ADMIN + "/roles" ,authMiddleware.requireAuth , roleRoutes);
    app.use(PATH_ADMIN + "/accounts" ,authMiddleware.requireAuth, accountRoutes);
    app.use(PATH_ADMIN + "/my-account" ,authMiddleware.requireAuth, myAccountRoutes);
    app.use(PATH_ADMIN + "/auth" , authRoutes)

};