const {userModel} = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDataUri } = require('../utils/dataUri');
const cloudinary  = require('cloudinary');

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
            expires: new Date(Date.now() + 15*24*60*60*1000)  // Set the cookie to expire in 5 minutes
        });
        
        res.status(201).json({success:true, token, name:existing.name, email:existing.email, message:"Logged in successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:"Error while logging in, please try again!"});
    }
}

exports.avatarUpload = async(req,res) => {
    try {
        const dataUri = getDataUri(req.file);
        if(!dataUri.success){
            return res.json({success:false, message:"Something went wrong!"})
        }
        else{
            const myCloud = await cloudinary.v2.uploader.upload(dataUri.formated.content);
            return res.json({success:true, message: myCloud.secure_url})
        }
    } catch (error) {
        return res.json({success:false, message:"Something went wrong!"})    
    }
}

exports.updateProfile = async(req,res) => {
    const {currentpassword, newpassword, email, name, bio, avatar} = req.body;
    try {
        const id = req.userId;
        if(currentpassword.length>0) {
            const response1 = await userModel.findOne({_id:id});
            const matchPassword = await bcrypt.compare(currentpassword, response1.password);
            if(!matchPassword) return res.json({success:false, message:"Invalid current password"});
            else if(newpassword.length>0){
                const hashedPassword = await bcrypt.hash(newpassword,10);
                const response = await userModel.findOneAndUpdate({_id:id},{
                    name,
                    bio,
                    avatar,
                    password: hashedPassword
                });

            }else{
                const response = await userModel.findOneAndUpdate({_id:id},{
                    name,
                    bio,
                    avatar,
                });

            }
        }else{
            const response = await userModel.findOneAndUpdate({_id:id},{
                name,
                bio,
                avatar,
            });
        }
        res.json({success:true,message:"Profile Updated Successfully"})
    } catch (error) {
        res.json({success:false, message: "Something went wrong!"})
    }
    

}


exports.getUser = async(req,res) =>{
    const id = req.userId;
    try {
        const response = await userModel.findOne({_id:id});
        return res.json({success:true, message: response});
    } catch (error) {
        return res.json({success:false, message: "Something went wrong!"});
    }
}



exports.check = (req,res) =>{
    if(req.userId){
        res.status(200).json({success:true, message:"User Authorized!"})
    }
}

exports.validate = (req, res) => {
    const {id} = req.body;
    if(req.userId===id){
        res.json({success:true});
    }else{
        res.json({success:false});
    }
}
