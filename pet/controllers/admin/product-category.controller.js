const PetCategory = require("../../models/Pet-category.model");
const createTree = require("../../helper/createTree");
const systemConfig = require("../../config/system.js");

// [GET]/admmin/products-category
module.exports.index = async (req,res) => {
    let find = {
        deleted : false,
    }
    // Lấy danh sách bản ghi
    const records = await PetCategory.find(find);
    // Lấy ra thằng cha bản ghi
    const newRecords = createTree(records);
    res.render("admin/pages/product-category/index",{
        pageTitle : "Danh sách sản phẩm",
        records : newRecords,
    })
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
        await PetCategory.updateOne({
            _id:id
        }, {
            ...req.params, // Lấy ra hết phần tử req.params
            $push: {updateBy : updateBy} // update lại status
        });
        
        req.flash('success', 'Cập nhật trạng thái thành công');
        res.redirect('back');
        
    } catch(err) {
        req.flash('error', 'Có lỗi, vui lòng kiểm tra lại');
        res.redirect('back');
    }
}

// [GET]/admin/products-category/create

module.exports.create = async (req,res) => {
    let find = {
        deleted : false,
    }
    const records = await PetCategory.find(find);
    const newRecords = createTree(records);
    res.render("admin/pages/product-category/create",{
        pageTitle : "Thêm mới sản phẩm",
        records : newRecords,
    })
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => { 
    // tăng position nếu ko điền
    if (req.body.position === "") {
        const countRecords = await PetCategory.countDocuments();
        req.body.position = countRecords;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    const record = new PetCategory(req.body);
    await record.save();
    res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
}

// [GET] /admin/products-category/edit/:id

module.exports.edit = async(req,res) => {
    const id = req.params.id;
    const data = await PetCategory.findOne ({
        _id : id,
        deleted : false,
    });
    const records = await PetCategory.find({
        deleted : false,
    })
    const newRecords = createTree(records);
    res.render("admin/pages/product-category/edit",{
        pageTitle : "Trang chỉnh sửa sản phẩm",
        data : data,
        records : newRecords,
    })
}

// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async(req,res) => {
    const id = req.params.id;

    req.body.position = parseInt(req.body.position);
    
    await PetCategory.updateOne({
        _id : id,
    },{
        ...req.body,
    })

    res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
}

// [GET]/admin/products-category/details/:id
module.exports.detail = async(req,res) => {
    const id = req.params.id;
    const product = await PetCategory.findOne({
        _id : id,
        deleted : false
    })
    res.render("admin/pages/product-category/detail",{
        pageTitle : "Trang chi tiết sản phẩm",
        product : product,
    })
}

module.exports.detailsPatch = async(req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    const updateBy = {
        // account_id : res.locals.user.id, // id người dùng
        updateAt: new Date() // ngày update
    }
    await PetCategory.updateOne({
        _id : id,
    },{
        status,
        $push: {updateBy : updateBy}
    })
    req.flash("success","Cập nhật trạng thái thành công");
    res.redirect("back");
}

// [DELETE] / admin/products-category/delete/:id

module.exports.deleteItem = async(req,res) => {
    const id = req.params.id;
    await PetCategory.updateOne({
        _id : id,
    },{
        deleted : true,
        deletedAt : new Date() // ngày update
    })
    req.flash("success","Xoá sản phẩm thành công");
    res.redirect("back");
}

