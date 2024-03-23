const Auth = require("../../models/auth.model");
const md5 = require("md5");

const generateHelper = require("../../helper/generate.js");
const Cart = require("../../models/cart.model");

// [GET] /auth/login
module.exports.login = async(req,res) => {
    const user = await Auth.find(
        { deleted: false }
    );
    res.render("client/pages/auth/login", {
        pageTitle: "Đăng ký",
        user : user,
    });
}

// [POST] /auth/login
module.exports.loginPost = async(req,res) => {
    try {
        const name_id = req.body.name_id;
        const password = req.body.password;
        const account = await Auth.findOne(
            {
                $or: [  
                    {name_id},
                    {email: name_id},
                    {phone: name_id}  
                ],
                deleted: false 
            }
        );
        if (account.status == "inactive") {
            req.flash("error", "Tài khoản không tồn tại");
            res.redirect("back");
            return;
        }
        if (!account) {
            req.flash("error", "Tài khoản không tồn tại");
            res.redirect("back");
            return;
        }
        if ((md5)(password) !== (account.password)) {
            req.flash("error", "Sai mật khẩu");
            res.redirect("back");
            return;
        }
        if ( name_id == account.name_id || name_id == account.email || name_id == account.phone) {
            
            res.cookie("tokenUser",account.tokenUser,{ expires: new Date(Date.now() + 90000000)});
            
            // Cập nhật lại trang thái hiện tại (online)
            await Auth.updateOne({
                _id: account.id
            },
            //     {
            //     statusOnline: "online",
            // }
            )

            // _io.once('connection',(socket) => {
            //     socket.broadcast.emit("SERVER_RETURN_USER_ONLINE",user.id);
            // });

            // Lưu user_id vào collection carts

            await Cart.updateOne({
                _id : req.cookies.cartId,
            },{
                user_id : account.id
            })
            res.redirect("/");
            return;
        }
        else {
            req.flash("error", "Tài khoản không tồn tại");
            res.redirect("back");
            return;
        }

    } catch(err) {
        req.flash("error", "Đăng nhập không thành công");
        res.redirect("back");
    }
} 
// [GET] /auth/signup
module.exports.signup = async(req,res) => {
    res.render("client/pages/auth/signup", {
        pageTitle: "Đăng ký",
    });
}

// [POST] /auth/signup
module.exports.signupPost = async(req,res) => {
    try {
        const name_id = req.body.name_id;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        const accounts = await Auth.find({deleted:false});
        for (const account of accounts){
            if (account.name_id == name_id ) {
                req.flash("error", "Tên đăng nhập đã được sử dụng. Vui lòng chọn tên đăng nhập khác.");
                res.redirect("back");
                return;
            }
            
            if (account.email == email) {
                req.flash("error", "Email này đã được sử dụng. Vui lòng đổi email khác. ");
                res.redirect("back");
                return;
            }
            if (account.phone == phone) {
                req.flash("error", "Số điện thoại này đã được sử dụng. Vui lòng đổi Số điện thoại khác. ");
                res.redirect("back");
                return;
            }
        }
        req.body.password = (md5)(req.body.password);
        // Check password length
        if (password.length < 6) {
            req.flash("error", "Mật khẩu phải có hơn 5 ký tự");
            res.redirect("back");
            return;
        }
        const emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const phonePattern = /((09|03|07|08|05)+([0-9]{8})\b)/g;

        if (!emailPattern.test(req.body.email)) {
            req.flash("error", "Vui lòng nhập đúng email.");
            res.redirect("/auth/logout");
            return;
        } 
        if (!phonePattern.test(req.body.phone)) {
            req.flash("error", "Vui lòng nhập đúng số điện thoại.");
            res.redirect("/auth/logout");
            return;
        } 
        const record = new Auth(req.body);
        await record.save();
        req.flash("success", "Hãy đăng nhập để tiếp tục.");
        res.redirect("/auth/login");

    } catch(err) {
        req.flash("error", "Đăng ký không thành công");
        res.redirect("back");
    }
}

// [GET] /auth/logout

module.exports.logout = async(req,res) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
}