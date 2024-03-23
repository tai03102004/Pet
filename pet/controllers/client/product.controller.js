const Product = require("../../models/Pet.model");
const ProductCategory = require("../../models/Pet-category.model");
const productsHelper = require("../../helper/products");
const paginationHelper = require("../../helper/pagination");

// [GET] /products

module.exports.index = async(req,res) => {
    try {
        // Pagination

        let initPagination = {
            currentPage : 1, // Trang bắt đầu
            limitItems : 6 // Giới hạn 1 trang 
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
    } catch(e) {
        res.redirect("/");
    }
    
}

// [GET] /products/:slugCategory

module.exports.category = async(req,res) => {
    // try {
        const slugCategory = req.params.slugCategory;
        const category = await ProductCategory.findOne ({
            slug : slugCategory,
            status : "active",
            deleted : false,
        });

        // Pagination
        let initPagination = {
            currentPage : 1, // Trang bắt đầu
            limitItems : 6 // Giới hạn 1 trang 
        }
        let find = {
            deleted : false,
            status : "active",
        };

        const countProducts = await Product.countDocuments(find); // Tổng sản phẩm
        const objectPagination = paginationHelper(initPagination, req.query,countProducts); 
        
        // End Pagination

        const getSubCategory = async (parentId) => {
            const subs = await ProductCategory.find({
                parent_id : parentId,
                status : "active",
                deleted : false,
            });
            let allSub = [...subs]; // lấy ra hết những thằng con

            for (const sub of subs) {
                const childs = await getSubCategory(sub.id);
                allSub = allSub.concat(childs);
            }
            return allSub;
        }
        const listSubCategory = await getSubCategory(category.id); // category.id : thằng cha

        const listSubCategoryId = listSubCategory.map (item => item.id);

        const products = await Product.find ({
            product_category_id : {
                $in : [category.id, ...listSubCategoryId],
            },
             // cái id của sản phầm sẽ là đc thêm mới trong model và lấy giá trị của danh sach sp
            status : "active",
            deleted : false,
        }).sort({position : "desc"});

        const newProducts = productsHelper.priceNewProducts(products);

        res.render("client/pages/products/index", {
            pageTitle: category.title,
            products: newProducts,
            pagination : objectPagination,
        })

    // } catch (err) {
    //     res.redirect("/");
    // }
}

// [GET]/ products /detail / :slugProduct
module.exports.detail = async(req,res) => {
    try {
        const slug = req.params.slugProduct;
        const product = await Product.findOne ({
            slug : slug,
            deleted : false,
            status : "active",
        });
        const products = await Product.find ({
            deleted : false,
            status : "active",
        });
        
        if (product.pet_category_id) {
            const category = await ProductCategory.findOne ({
                _id : product.pet_category_id,
                deleted : false,
                status : "active",
            });
            product.category = category;
        }
        product.priceNew = productsHelper.priceNewProduct(product);
        res.render("client/pages/products/detail", {
            pageTitle: "Chi tiết sản phẩm",
            product: product,
            pets : products,
        })
    } catch(err) {
        res.redirect("/");
    }
}