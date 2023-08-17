const mongoose = require('mongoose');

const LabelSchema = mongoose.Schema({
    value:{type:String,unique:true,require:true},
    label:{type:String,unique:true,require:true},
})

module.exports = LabelModel = mongoose.model('Labels',LabelSchema)