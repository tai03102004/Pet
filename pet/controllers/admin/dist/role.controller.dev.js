"use strict";

var Role = require("../../models/roles.model");

var systemConfig = require("../../config/system"); // [GET]/admin/roles


module.exports.index = function _callee(req, res) {
  var records;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Role.find({
            deleted: false
          }));

        case 2:
          records = _context.sent;
          res.render("admin/pages/roles/index.pug", {
            pageTitle: "Trang nhóm quyền",
            records: records
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}; // [GET]/admin/roles/create


module.exports.create = function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.render("admin/pages/roles/create.pug", {
            pageTitle: "Trang tạo mới nhóm quyền"
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // [POST] /admin/roles/create


module.exports.createPost = function _callee3(req, res) {
  var record;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          record = new Role(req.body);
          _context3.next = 3;
          return regeneratorRuntime.awrap(record.save());

        case 3:
          req.flash("success", "Thêm mới nhóm quyền thành công");
          res.redirect("/".concat(systemConfig.prefixAdmin, "/roles"));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // [GET] /admin/roles/edit/:id


module.exports.edit = function _callee4(req, res) {
  var id, data;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Role.findOne({
            _id: id,
            deleted: false
          }));

        case 4:
          data = _context4.sent;
          res.render("admin/pages/roles/edit.pug", {
            pageTitle: "Chỉnh sửa nhóm quyền",
            data: data
          });
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          res.redirect("/".concat(systemConfig.prefixAdmin, "/roles"));

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // [PATCH] /admin/roles/edit/:id


module.exports.editPatch = function _callee5(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Role.updateOne({
            _id: id
          }, req.body));

        case 3:
          req.flash("success", "Cập nhật nhóm quyền thành công");
          res.redirect("back");

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
}; // [GET] /admin/roles/permissions


module.exports.permissions = function _callee6(req, res) {
  var records;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Role.find({
            deleted: false
          }));

        case 3:
          records = _context6.sent;
          res.render("admin/pages/roles/permission.pug", {
            pageTitle: "Trang phân quyền",
            records: records
          });
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          res.redirect("/".concat(systemConfig.prefixAdmin, "/roles"));

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // [PATCH] /admin/roles/permissions


module.exports.permissionsPatch = function _callee7(req, res) {
  var permissions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          // fontend sẽ chuyển về String nên BackEnd phải chuyển lại về mảng
          console.log(req.body.permissions);
          permissions = JSON.parse(req.body.permissions);
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context7.prev = 5;
          _iterator = permissions[Symbol.iterator]();

        case 7:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context7.next = 14;
            break;
          }

          item = _step.value;
          _context7.next = 11;
          return regeneratorRuntime.awrap(Role.updateOne({
            _id: item.id
          }, {
            permissions: item.permissions
          }));

        case 11:
          _iteratorNormalCompletion = true;
          _context7.next = 7;
          break;

        case 14:
          _context7.next = 20;
          break;

        case 16:
          _context7.prev = 16;
          _context7.t0 = _context7["catch"](5);
          _didIteratorError = true;
          _iteratorError = _context7.t0;

        case 20:
          _context7.prev = 20;
          _context7.prev = 21;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 23:
          _context7.prev = 23;

          if (!_didIteratorError) {
            _context7.next = 26;
            break;
          }

          throw _iteratorError;

        case 26:
          return _context7.finish(23);

        case 27:
          return _context7.finish(20);

        case 28:
          req.flash("success", "Cập nhật phần Phân quyền thành công");
          res.redirect("back");

        case 30:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[5, 16, 20, 28], [21,, 23, 27]]);
}; // [GET] /admin/roles/detail


module.exports.detail = function _callee8(req, res) {
  var id, records;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          _context8.next = 3;
          return regeneratorRuntime.awrap(Role.findOne({
            _id: id,
            deleted: false
          }));

        case 3:
          records = _context8.sent;
          res.render("admin/pages/roles/detail", {
            pageTitle: "Trang xem chi tiết",
            records: records
          });

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  });
}; // [POST] /admin/roles/delete/:id


module.exports["delete"] = function _callee9(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          id = req.params.id; // updateOne(filter, update, options)

          _context9.next = 3;
          return regeneratorRuntime.awrap(Role.updateOne({
            _id: id
          }, {
            deleted: true,
            deletedAt: new Date()
          }));

        case 3:
          req.flash("success", "X\xF3a th\xE0nh c\xF4ng s\u1EA3n ph\u1EA9m!");
          res.redirect("back");

        case 5:
        case "end":
          return _context9.stop();
      }
    }
  });
};