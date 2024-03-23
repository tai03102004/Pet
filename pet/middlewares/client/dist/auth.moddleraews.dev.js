"use strict";

//   để khi vào trang chính phải đăng nhập ko bị out ra
// Lưu ý có thể F12 để thêm token
// xử lý tiếp
// Lấy ra tài khoản
var Auth = require("../../models/auth.model");

module.exports.requireAuth = function _callee(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Auth.findOne({
            tokenUser: req.cookies.tokenUser,
            deleted: false
          }).select("-password"));

        case 2:
          user = _context.sent;

          // để dùng user toàn cục
          if (user) {
            res.locals.user = user;
          } // để lấy id của người phân quyền từ đó có thể cho người đó phù hợp với các lựa chọn


          next();

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};