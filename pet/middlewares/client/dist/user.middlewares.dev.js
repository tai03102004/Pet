"use strict";

var User = require("../../models/auth.model"); // Khi đăng xuất sẽ chuyển sang trang đăng nhập


module.exports.requireAuth = function _callee(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.cookies.tokenUser) {
            _context.next = 3;
            break;
          }

          res.redirect("/auth/login");
          return _context.abrupt("return");

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            tokenUser: req.cookies.tokenUser
          }));

        case 5:
          user = _context.sent;

          if (user) {
            _context.next = 9;
            break;
          }

          res.redirect("/auth/login");
          return _context.abrupt("return");

        case 9:
          next();

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};