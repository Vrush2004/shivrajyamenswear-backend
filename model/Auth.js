const mongoose = require('mongoose');

const AuthSchema = mongoose.Schema({
    email:{type:String,require:true},
    password:{type:String,require:true}
})

module.exports = AuthModel = mongoose.model('Auth',AuthSchema);