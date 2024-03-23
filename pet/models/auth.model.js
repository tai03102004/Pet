const mongoose = require('mongoose');
const generate = require("../helper/generate");

const authSchema = new mongoose.Schema({
    name : String,
    name_id : String,
    email : String,
    password : String,
    tokenUser : {
        type : String,
        default : generate.generateRandomString(31),
    },
    phone : String,
    avatar : String,
    friendList: [ // 1 mảng các bạn bè
        {
            user_id : String, // id của bạn bè
            room_chat_id : String, // Phòng chat
        }
    ],
    acceptFriends: Array, // đồng ý kết bạn
    requestFriends: Array, // gửi lời mời
    statusOnline : String, // Trạng thái hoạt động
    status : {
        type : String,
        default : "active",
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
},
    { timestamps: true }
);

const Auth = mongoose.model('Auth', authSchema,"auth");

module.exports = Auth;