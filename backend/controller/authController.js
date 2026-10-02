const User = require('../model/User')
const bcrypt = require('bcryptjs')
// const message = require('../utils/otpMessage');
const {generateToken} = require('../utils/authentication');
// const sendEmail = require('../utils/sendEmail');


const registerUser = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = await User.create({name,email,password : hashedPassword});

        if(user){
            // const otp = Math.floor(100000 + Math.random() * 900000).toString();

            // const mailMessage = message();
            // await sendEmail(email,'Welcome To ShopNest - Your OTP for Registration',mailMessage)

            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                message: "User Registered Successfully"
            })
        }
        else{
            return res.status(400).json({
                message: 'Invalid user data'
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const loginUser =  async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(user && await bcrypt.compare(password,user.password)){
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                message: "User login Successfully"
            })
        }
        else{
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const getUsers = async (req,res)=>{
    try {
        const users = await User.find().select('-password');
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


module.exports = {
    registerUser,
    loginUser,
    getUsers
}