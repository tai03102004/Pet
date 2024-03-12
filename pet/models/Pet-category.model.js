const mongoose = require('mongoose');
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const petCategory = new mongoose.Schema({
    title : String,
    parent_id : {
        type: String,
        default : ""
    },
    description : String,
    thumbnail : String,
    featured : String,
    status : String,
    position : Number,
    slug : {
        type : String,
        slug : "title",
        unique : true, // ko có 2 gt slug trong csdl
    },
    deleted : {
        type : Boolean,
        default : false,
    },
    deletedAt : Date,
},
    {timestamps : true}
)

const PetCategory = mongoose.model('PetCategory', petCategory, 'Pet-category');
module.exports = PetCategory;