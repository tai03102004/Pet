"use strict";

// Trang phân quyền
var mongoose = require("mongoose");

var rolesSchema = new mongoose.Schema({
  title: String,
  description: String,
  permissions: {
    type: Array,
    "default": [] // backend nhận đc các tick lưu vào 1 mảng

  },
  // lưu các giá trị ("Xem bài viết","Thêm mới bài viết"  , ...)
  deleted: {
    type: Boolean,
    // true : product đã bị xoá , false : ko
    "default": false
  },
  deletedAt: Date // ghi thời điểm xoá

}, {
  timestamps: true
});
var Role = mongoose.model("Roles", rolesSchema, "roles");
module.exports = Role;