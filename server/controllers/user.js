const UserAuth = require('../models/userModel.js')
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')

const register = async(req,res)=>{
    try {
        const {userName, email, password, confirmPassword} = req.body;

        if(!userName || !email || !password){
            return res.status(301).send({
                message: "All fields are required",
                success: false
            })
        }
        if(password !== confirmPassword){
            return res.status(401).send({
                message: "password and confirmPassword should be match",
                success: false
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = new UserAuth({
            userName,
            email,
            password: hashedPassword
        })
        await user.save();
        return res.status(200).send({
            message: "Registered successfully",
            success: true
        })
    } catch (error) {
        return res.status(401).send({
            message: error.message,
            success: false
        })
    }
}


const login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await UserAuth.findOne({email});

        if(!user){
            return res.status(401).send({
                message: "User not exist"
            })
        }
      const ismatched = await bcryptjs.compare(password, user.password)
          
        if(!ismatched){
            return res.status(401).send({
                message: "Email or password is incorrect",
                success: false
            })
        }

         // tokendata
       const tokenData = {
        id: user._id
       }
        const token =  await jwt.sign(tokenData,process.env.JWt_SECRET,{expiresIn: "1hr"})

         // storing token in cookie
       return res.status(200).cookie('token',token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production', // set secure cookie in production
        sameSite: 'Strict' // to prevent CSRF attacks
       }).json({
        message: "Login succesfully",
        user,
        success:true
       })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {register, login}


