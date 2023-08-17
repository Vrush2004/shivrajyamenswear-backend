const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    value:{type:String,unique:true,require:true},
    label:{type:String,unique:true,require:true},
    img:{type:String,unique:true,require:true},
})

module.exports = CategoryModel = mongoose.model('Categories',CategorySchema)