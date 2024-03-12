const Product = require("../../models/Pet.model");
const paginationHelper = require("../../helper/pagination");
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const PetCategory = require("../../models/Pet-category.model");
const createTree = require("../../helper/createTree.js");
const systemConfig = require("../../config/system");
// [GET] / admin/products
module.exports.index = async(req,res) => {
    try {
        let find = {
            deleted : false,
        };

        // FilterStatus

        const filterStatus = filterStatusHelper(req.query);
        if (req.query.status) {
            find.status = req.query.status;
        }

        // End FilterStatus

        // Pagination

        let initPagination = {
            currentPage : 1, // Trang bắt đầu
            limitItems : 2 // Giới hạn 1 trang 
        }

        const countProducts = await Product.countDocuments(find); // Tổng sản phẩm
        const objectPagination = paginationHelper(initPagination, req.query,countProducts); 
        
        // End Pagination

        // Sort

        let sort = {};
        if (req.query.sortKey && req.query.sortValue) { // position - desc
            sort[req.query.sortKey] = req.query.sortValue;
        } else {
            sort.position = "desc";
        }

        // End Sort

        // Search(Find) Product

        let objectSearch = searchHelper(req.query);
        if (req.query.keyword) {
            find.title = objectSearch.regex;
        }

        // End Search(Find) Product

        const petProduct = await Product.find(find)
                                    .sort(sort)
                                    .limit(objectPagination.limitItems) // Giới hạn 1 trang số sản phẩm hiển thị
                                    .skip(objectPagination.skip); // Bỏ qua sản phẩm
        if (petProduct.length > 0 || countProducts == 0) {
            res.render("admin/pages/products/index", {
                pageTitle : "Danh sách sản phẩm",
                petProduct : petProduct,
                pagination : objectPagination,
                filterStatus : filterStatus,
                keyword : objectSearch.keyword,
            })
        } else {
            // redirect về trang 1 & stringQuery : Truy vấn tiếp theo (Tìm kiếm sẽ trả về trang 1 ...)
            let stringQuery = "";
            for (const key in req.query) {
                if (key != "page") {
                    stringQuery += `&${key}=${req.query[key]}`;
                }
            }
            const href = `${req.baseUrl}?page=1${stringQuery}`;
            res.redirect(href);
        }
    } catch(err) {
        req.flash("error","Lỗi sản phẩm");
        res.redirect("back");
    }
}

// [PATCH] /admin/products/changeStatus/:status/:id

module.exports.changeStatus = async(req,res) => {
    try {
        // const status = req.params.status;
        const id = req.params.id;
        const updateBy = {
            // account_id : res.locals.user.id, // id người dùng
            updateAt : new Date(),
        }
        await Product.updateOne({
            _id:id
        }, {
            ...req.params, // Lấy ra hết phần tử req.body
            $push: {updateBy : updateBy} // update lại status
        });
        
        req.flash('success', 'Cập nhật trạng thái thành công');
        res.redirect('back');
        
    } catch(err) {
        req.flash('error', 'Có lỗi, vui lòng kiểm tra lại');
        res.redirect('back');
    }
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async(req,res) => {
    try{
        const type = req.body.type; // status : active or inactive
        const ids = req.body.ids.split(", ");// ids lấy ra các mảng id 
        const updateBy = {
            // account_id : res.locals.user.id,
            updateAt: new Date()
        }
        switch(type) {
            case 'active':
            case 'inactive':
                await Product.updateMany({
                    _id : {$in : ids},
                    // $in : update many ids 
                },{
                    status : type
                });
                req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);

                break;
            case "delete-all" :
                await Product.updateMany({
                    _id : {$in:ids},
                },{
                    deleted : true,
                    deleteBy : {
                        // account_id : res.locals.user.id,
                        deleteAt: new Date(),
                    }
                })
                req.flash("success", `Xóa thành công ${ids.length} sản phẩm!`);
                break;
            
            case "change-position" :
                for (const item of ids) {
                    const [id,position] = item.split('-');
                    await Product.updateOne({
                        _id : id
                    },{
                        position : position
                    },{
                        ...req.body,
                        $push: {updateBy : updateBy}
                    })
                }

            default:
                break;
        }
        res.redirect('back');
    } catch(err) {
        req.flash("error", "Có lỗi xảy ra trong quá trình thay đổi trạng thái");
        res.redirect('back');
    }
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async(req,res) => {
    try {
        const id = req.params.id;
        await Product.updateOne({
            _id : id
        },{
            deleted : true,
            deleteBy : {
                // account_id : res.locals.user.id, // để kiểm tra có phải 1 người ko
                deleteAt: new Date(),
            }
        })
        req.flash("success", `Xóa thành công sản phẩm!`);

        res.redirect("back");
    } catch(err) {
        req.flash("error","Lỗi khi xoá sản phẩm");
        res.redirect("back");
    }
    
}

// [GET] /admin/products/create

module.exports.create = async(req,res) => {
    const id = req.params.id;
    let find = {
        deleted : false,
    }
    const records = await PetCategory.find(find);
    const newRecords = createTree(records);
    res.render("admin/pages/products/create", {
        pageTitle : "Tạo mới sản phẩm",
        records : newRecords,
    })
}

  // [POST] /admin/products/create
module.exports.createPost = async (req, res)  => {
    try {
        req.body.price = parseFloat(req.body.price);
        req.body.discountPercentage = parseFloat(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock);
        req.body.age = parseInt(req.body.age);
        if (req.body.position == '' ){
            const countProducts = await Product.countDocuments();
            req.body.position = countProducts + 1;
        } else {
            req.body.position = parseInt(req.body.position);
        }
        if(req.file && req.file.filename) { 
            req.body.thumbnail = `/uploads/${req.file.filename}`;
        }
        const product = new Product(req.body);
        await product.save();
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
    catch (err) {
        res.redirect("back");
        // res.status(403).send('Forbidden: You do not have access to this resource.');
    }
}

module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findOne({
            _id : id,
            deleted : false,
        });
        const records = await PetCategory.find({
            deleted : false,
        });
        const newRecords = createTree(records);
        res.render('admin/pages/products/edit', {
            pageTitle : "Chỉnh sửa sản phẩm",
            product : product,
            records : newRecords,
        });
    } catch(err){
        req.flash("error","Thông tin sản phẩm không tìm thấy");
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
}

module.exports.editPost = async (req, res) => {
    try {
        const id = req.params.id;
        req.body.price = parseFloat(req.body.price);
        req.body.discountPercentage = parseFloat(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock);
        req.body.gender = String(req.body.gender);
        const updateBy = {
            // account_id : res.locals.user.id,
            updateAt: new Date()
        }
        req.body.position = parseInt(req.body.position);
        if(req.file && req.file.filename) {
            req.body.thumbnail = `/uploads/${req.file.filename}`;
        }
        await Product.updateOne({
            _id : id,
        },{
            ...req.body,
            $push:{
                updateBy : updateBy,
            }
        })
        req.flash('success',"Chỉnh sửa sản phẩm thành công");
        res.redirect('back');
    } catch (e) {
        req.flash('error',"Có lỗi xảy ra trong quá trình chỉnh sửa");
    }
}

// /details/:id

module.exports.details = async(req,res) => {
    try {
        const id = req.params.id;
        
        const product = await Product.findOne({
            _id : id,
            deleted : false,
        });

        res.render("admin/pages/products/detail.pug", {
            pageTitle : "Chi tiết sản phẩm",
            product : product,
        })
    } catch(err) {
        res.render(`/${systemConfig.prefixAdmin}/products`);
        res.flash("error","Thông tin sản phẩm gặp vấn đề");
    }
}

module.exports.detailsPatch = async(req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    const updateBy = {
        // account_id : res.locals.user.id, // id người dùng
        updateAt: new Date() // ngày update
    }
    await Product.updateOne({
        _id : id,
    },{
        status,
        $push: {updateBy : updateBy}
    })
    req.flash("success","Cập nhật trạng thái thành công");
    res.redirect("back");
}