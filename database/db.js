const mongoose = require('mongoose');

mongoose.set('strictQuery', false)

const Connect = async ()=>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("Mongodb connect");
    } catch (error) {
        console.log("Mongodb connection error: ", error);
        process.exit(1);
    }
}

module.exports = Connect;