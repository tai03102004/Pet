"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Account = require('../../models/account.model');

var Role = require('../../models/roles.model');

var md5 = require("md5");

var systemConfig = require('../../config/system');

var moment = require('moment');

module.exports.index = function _callee(req, res) {
  var records, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, record, role;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Account.find({
            deleted: false
          }));

        case 2:
          records = _context.sent;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 6;
          _iterator = records[Symbol.iterator]();

        case 8:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 17;
            break;
          }

          record = _step.value;
          _context.next = 12;
          return regeneratorRuntime.awrap(Role.findOne({
            _id: record.role_id
          }));

        case 12:
          role = _context.sent;
          record.role = role;

        case 14:
          _iteratorNormalCompletion = true;
          _context.next = 8;
          break;

        case 17:
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](6);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 23:
          _context.prev = 23;
          _context.prev = 24;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 26:
          _context.prev = 26;

          if (!_didIteratorError) {
            _context.next = 29;
            break;
          }

          throw _iteratorError;

        case 29:
          return _context.finish(26);

        case 30:
          return _context.finish(23);

        case 31:
          res.render("admin/pages/account/index", {
            pageTitle: "Tài khoản",
            records: records
          });

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 19, 23, 31], [24,, 26, 30]]);
}; // [GET] /admin/pages/account/create


module.exports.create = function _callee2(req, res) {
  var roles;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Role.find({
            deleted: false
          }));

        case 2:
          roles = _context2.sent;
          res.render("admin/pages/account/create", {
            pageTitle: "Thêm mới tài khoản",
            roles: roles
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // [POST] /admin/pages/account/createPost


module.exports.createPost = function _callee3(req, res) {
  var record;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // password mình nhập vào sẽ random 31 ký tự (dù mình nhập có 5-6 từ)
          req.body.password = md5(req.body.password);
          record = new Account(_objectSpread({}, req.body, {
            deleted: false
          }), {
            createdAt: new Date()
          });
          _context3.next = 4;
          return regeneratorRuntime.awrap(record.save());

        case 4:
          res.redirect("/".concat(systemConfig.prefixAdmin, "/accounts"));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // Kiểm tra và cập nhật trạng thái của các tài khoản sau 10 giây


var checkInactiveAccounts = function checkInactiveAccounts() {
  var oneYearAgo, accounts, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, account;

  return regeneratorRuntime.async(function checkInactiveAccounts$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000); // Thời điểm 10 giây trước

          _context4.next = 3;
          return regeneratorRuntime.awrap(Account.find({
            createdAt: {
              $lte: oneYearAgo
            },
            status: 'active'
          }));

        case 3:
          accounts = _context4.sent;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context4.prev = 7;
          _iterator2 = accounts[Symbol.iterator]();

        case 9:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context4.next = 18;
            break;
          }

          account = _step2.value;
          account.status = 'inactive';
          _context4.next = 14;
          return regeneratorRuntime.awrap(account.save());

        case 14:
          console.log("\u0110\xE3 c\u1EADp nh\u1EADt tr\u1EA1ng th\xE1i t\xE0i kho\u1EA3n ".concat(account._id, " th\xE0nh inactive"));

        case 15:
          _iteratorNormalCompletion2 = true;
          _context4.next = 9;
          break;

        case 18:
          _context4.next = 24;
          break;

        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](7);
          _didIteratorError2 = true;
          _iteratorError2 = _context4.t0;

        case 24:
          _context4.prev = 24;
          _context4.prev = 25;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 27:
          _context4.prev = 27;

          if (!_didIteratorError2) {
            _context4.next = 30;
            break;
          }

          throw _iteratorError2;

        case 30:
          return _context4.finish(27);

        case 31:
          return _context4.finish(24);

        case 32:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[7, 20, 24, 32], [25,, 27, 31]]);
}; // Chạy cron job mỗi giây để kiểm tra và cập nhật trạng thái của các tài khoản


setInterval(checkInactiveAccounts, 24 * 60 * 60 * 1000); // [GET] /admin/accounts/detail

module.exports.detail = function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res.render("admin/pages/account/detail", {
            pageTitle: "Thông tin tài khoản"
          });

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}; // [GET] /admin/accounts/edit/:id


module.exports.edit = function _callee5(req, res) {
  var roles, id, data;
  return regeneratorRuntime.async(function _callee5$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Role.find({
            deleted: false
          }));

        case 2:
          roles = _context6.sent;
          id = req.params.id;
          _context6.next = 6;
          return regeneratorRuntime.awrap(Account.findOne({
            _id: id
          }, {
            deleted: false
          }));

        case 6:
          data = _context6.sent;
          res.render("admin/pages/account/edit", {
            pageTitle: "Sửa tài khoản",
            roles: roles,
            data: data
          });

        case 8:
        case "end":
          return _context6.stop();
      }
    }
  });
}; // [PATCH] /admin/accounts/edit/:id


module.exports.editPatch = function _callee6(req, res) {
  var password, id, account;
  return regeneratorRuntime.async(function _callee6$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          password = req.body.password;
          id = req.params.id;
          _context7.next = 4;
          return regeneratorRuntime.awrap(Account.findOne({
            _id: id
          }, {
            deleted: false
          }));

        case 4:
          account = _context7.sent;

          if (!(password == account.password)) {
            _context7.next = 10;
            break;
          }

          req.flash("error", "Mật khẩu này trùng với mật khẩu cũ của ban. Vui lòng đổi lại ");
          res.redirect("back");
          _context7.next = 15;
          break;

        case 10:
          if (req.body.password) {
            req.body.password = md5(password);
          } else {
            delete req.body.password;
          }

          _context7.next = 13;
          return regeneratorRuntime.awrap(Account.updateOne({
            _id: id
          }, _objectSpread({}, req.body)));

        case 13:
          req.flash("success", "Cập nhật tài khoản thành công");
          res.redirect("/".concat(systemConfig.prefixAdmin, "/accounts"));

        case 15:
        case "end":
          return _context7.stop();
      }
    }
  });
};