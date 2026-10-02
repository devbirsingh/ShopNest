const mongoose = require("mongoose");

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected Successfully");
    } catch (error) {
        console.log("error in DB connection",error.message);
        // process.exit(1);
    }    
}

module.exports = connectDB;