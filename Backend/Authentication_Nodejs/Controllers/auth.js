const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const user = require('../Database/db.js');

app.use(cookieParser());

dotenv.config({
    path:'./.env'
})

const secretcode = process.env.SECRET_CODE;

async function is_login(req,res){
    try{
    const token = await req.cookies.token;
    if(token){
        jwt.verify(token,secretcode,async (err,decoded)=>{
            if(decoded){
                email = decoded.email;
                const user_res = await user.findOne({email});
                if(user_res){
                    res.status(200).json({
                        message:"User Logged in",
                        user:user_res,
                        success:true
                    })
                }
                else{
                    res.status(200).json({
                        message:"User Not Logged in",
                        success:false
                    })
                }
            }
            else{
                res.status(200).json({
                    message:"User Not Logged in",
                    success:false
                })
            }
        }); 
    }
    else{
        res.status(200).json({
            message:"User Not Logged in",
            success:false
        })
    }
    }
    catch (err) {
        // Catch any server-side errors
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: err.message
        });
    }

}

async function signup_controller(req,res){
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(200).json({
            message:"All fields must be filled",
            success:false
        })
    }

    try{
    const user_email = await user.findOne({email});
    const user_name = await user.findOne({name});

    if(user_email){
        return res.status(200).json({
            message:"Email Already Exists",
            success:false
        })
    }
    if(user_name){
        return res.status(200).json({
            message:"Username Already Exists",
            success:false
        })
    }

    if(password.length<6){
        return res.status(200).json({
            message:"Password must be more than 6 characters",
            success:false
        })
    }

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,(err,hash)=>{
            user.create({
                name,
                email,
                password:hash
            });
        })
    })
    res.status(200).json({
        message:"Account Created Successfully",
        success:true
    })
    }
    catch (err) {
        // Catch any server-side errors
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: err.message
        });
    }
}

async function login_controller(req,res){
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(200).json({
            message:"All fields must be filled",
            success:false
        })
    }
    try{
    const user_data = await user.findOne({email});

    if(user_data){
        const is_user = await bcrypt.compare(password,user_data.password);
        if(is_user){
            const token = jwt.sign({email:email},secretcode);
            res.cookie('token',token);
            res.status(200).json({
                message:"Welcome ",
                user:user_data,
                success:true
            })
        }
        else{
            res.status(200).json({
                message:"Email or Password is wrong",
                success:false
            });
        }
    }
    else{
        res.status(200).json({
            message:"Email or Password is wrong",
            success:false
        });
    }
    }
    catch (err) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: err.message
        });
    }

}

async function history_controller(req,res) {
    const { email, details } = req.body; // Expecting the history object from the frontend

    try {
        const user1 = await user.findOne({ email });
        if (!user1) {
            res.status(404).json({
               message: 'User not found',
               success:false
            });
        }
    
        // Add the new history object
        user1.movieHistory.push(details);
        await user1.save();

        return res.status(200).json({ message: 'History added successfully', history: user1.movieHistory });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }

}

module.exports = {is_login,signup_controller,login_controller,history_controller};