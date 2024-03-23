"use strict";

var Auth = require("../../models/auth.model");

var md5 = require("md5");

var generateHelper = require("../../helper/generate.js");

var Cart = require("../../models/cart.model"); // [GET] /auth/login


module.exports.login = function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Auth.find({
            deleted: false
          }));

        case 2:
          user = _context.sent;
          res.render("client/pages/auth/login", {
            pageTitle: "Đăng ký",
            user: user
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}; // [POST] /auth/login


module.exports.loginPost = function _callee2(req, res) {
  var name_id, password, account;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          name_id = req.body.name_id;
          password = req.body.password;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Auth.findOne({
            $or: [{
              name_id: name_id
            }, {
              email: name_id
            }, {
              phone: name_id
            }],
            deleted: false
          }));

        case 5:
          account = _context2.sent;

          if (!(account.status == "inactive")) {
            _context2.next = 10;
            break;
          }

          req.flash("error", "Tài khoản không tồn tại");
          res.redirect("back");
          return _context2.abrupt("return");

        case 10:
          if (account) {
            _context2.next = 14;
            break;
          }

          req.flash("error", "Tài khoản không tồn tại");
          res.redirect("back");
          return _context2.abrupt("return");

        case 14:
          if (!(md5(password) !== account.password)) {
            _context2.next = 18;
            break;
          }

          req.flash("error", "Sai mật khẩu");
          res.redirect("back");
          return _context2.abrupt("return");

        case 18:
          if (!(name_id == account.name_id || name_id == account.email || name_id == account.phone)) {
            _context2.next = 28;
            break;
          }

          res.cookie("tokenUser", account.tokenUser, {
            expires: new Date(Date.now() + 90000000)
          }); // Cập nhật lại trang thái hiện tại (online)

          _context2.next = 22;
          return regeneratorRuntime.awrap(Auth.updateOne({
            _id: account.id
          } //     {
          //     statusOnline: "online",
          // }
          ));

        case 22:
          _context2.next = 24;
          return regeneratorRuntime.awrap(Cart.updateOne({
            _id: req.cookies.cartId
          }, {
            user_id: account.id
          }));

        case 24:
          res.redirect("/");
          return _context2.abrupt("return");

        case 28:
          req.flash("error", "Tài khoản không tồn tại");
          res.redirect("back");
          return _context2.abrupt("return");

        case 31:
          _context2.next = 37;
          break;

        case 33:
          _context2.prev = 33;
          _context2.t0 = _context2["catch"](0);
          req.flash("error", "Đăng nhập không thành công");
          res.redirect("back");

        case 37:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 33]]);
}; // [GET] /auth/signup


module.exports.signup = function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.render("client/pages/auth/signup", {
            pageTitle: "Đăng ký"
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // [POST] /auth/signup


module.exports.signupPost = function _callee4(req, res) {
  var name_id, email, phone, password, accounts, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, account, emailPattern, phonePattern, record;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          name_id = req.body.name_id;
          email = req.body.email;
          phone = req.body.phone;
          password = req.body.password;
          _context4.next = 7;
          return regeneratorRuntime.awrap(Auth.find({
            deleted: false
          }));

        case 7:
          accounts = _context4.sent;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context4.prev = 11;
          _iterator = accounts[Symbol.iterator]();

        case 13:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context4.next = 30;
            break;
          }

          account = _step.value;

          if (!(account.name_id == name_id)) {
            _context4.next = 19;
            break;
          }

          req.flash("error", "Tên đăng nhập đã được sử dụng. Vui lòng chọn tên đăng nhập khác.");
          res.redirect("back");
          return _context4.abrupt("return");

        case 19:
          if (!(account.email == email)) {
            _context4.next = 23;
            break;
          }

          req.flash("error", "Email này đã được sử dụng. Vui lòng đổi email khác. ");
          res.redirect("back");
          return _context4.abrupt("return");

        case 23:
          if (!(account.phone == phone)) {
            _context4.next = 27;
            break;
          }

          req.flash("error", "Số điện thoại này đã được sử dụng. Vui lòng đổi Số điện thoại khác. ");
          res.redirect("back");
          return _context4.abrupt("return");

        case 27:
          _iteratorNormalCompletion = true;
          _context4.next = 13;
          break;

        case 30:
          _context4.next = 36;
          break;

        case 32:
          _context4.prev = 32;
          _context4.t0 = _context4["catch"](11);
          _didIteratorError = true;
          _iteratorError = _context4.t0;

        case 36:
          _context4.prev = 36;
          _context4.prev = 37;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 39:
          _context4.prev = 39;

          if (!_didIteratorError) {
            _context4.next = 42;
            break;
          }

          throw _iteratorError;

        case 42:
          return _context4.finish(39);

        case 43:
          return _context4.finish(36);

        case 44:
          req.body.password = md5(req.body.password); // Check password length

          if (!(password.length < 6)) {
            _context4.next = 49;
            break;
          }

          req.flash("error", "Mật khẩu phải có hơn 5 ký tự");
          res.redirect("back");
          return _context4.abrupt("return");

        case 49:
          emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          phonePattern = /((09|03|07|08|05)+([0-9]{8})\b)/g;

          if (emailPattern.test(req.body.email)) {
            _context4.next = 55;
            break;
          }

          req.flash("error", "Vui lòng nhập đúng email.");
          res.redirect("/auth/logout");
          return _context4.abrupt("return");

        case 55:
          if (phonePattern.test(req.body.phone)) {
            _context4.next = 59;
            break;
          }

          req.flash("error", "Vui lòng nhập đúng số điện thoại.");
          res.redirect("/auth/logout");
          return _context4.abrupt("return");

        case 59:
          record = new Auth(req.body);
          _context4.next = 62;
          return regeneratorRuntime.awrap(record.save());

        case 62:
          req.flash("success", "Hãy đăng nhập để tiếp tục.");
          res.redirect("/auth/login");
          _context4.next = 70;
          break;

        case 66:
          _context4.prev = 66;
          _context4.t1 = _context4["catch"](0);
          req.flash("error", "Đăng ký không thành công");
          res.redirect("back");

        case 70:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 66], [11, 32, 36, 44], [37,, 39, 43]]);
}; // [GET] /auth/logout


module.exports.logout = function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res.clearCookie("tokenUser");
          res.redirect("/");

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
};