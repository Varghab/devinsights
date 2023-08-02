const {userModel} = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "devdevdevdev4"
// Create a new account
exports.signup = async (req,res)=>{
    const {name, email, password} = req.body;
    try {
        const existing = await userModel.findOne({email:email});
        if(existing){
            return res.status(400).json({message: "User already exists!"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const result = await userModel.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        res.status(201).json({success:true, message:"Account created successfully!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:"Something went wrong!"});
    }
}

// Login to an account
exports.login = async(req,res)=>{
    const {name, email, password} = req.body;
    try {
        const existing = await userModel.findOne({email:email});
        if(!existing){
            return res.status(404).json({success:false, message:"User with this email doesn't exist, please signup first!"})
        }

        const matchPassword = await bcrypt.compare(password, existing.password);

        if(!matchPassword) return res.status(404).json({success:false, message:"Invalid Credentials!"});
        const token = jwt.sign({email:existing.email, name:existing.name, id:existing._id}, SECRET_KEY,{expiresIn: "2 days",});
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        })
        res.status(201).json({success:true, token, name:existing.name, email:existing.email, message:"Logged in successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:"Error while logging in, please try again!"});
    }
}

exports.check = (req,res) =>{
    if(req.userId){
        res.status(200).json({success:true, message:"User Authorized!"})
    }
}