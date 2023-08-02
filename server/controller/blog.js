const cloudinary  = require('cloudinary');
const {blogModel} = require('../model/blog.model');
const { getDataUri } = require('../utils/dataUri');

exports.getAllBlogs = async(req,res) => {
    const result = await blogModel.find();
    try {
        return res.status(200).json({success:true, result});
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false, message:"Something went wrong!"})
    }
}

exports.createBlog = async (req, res) =>{
    try {
        const {title, content} = req.body;
        const dataUri = getDataUri(req.file);
        if(!dataUri.success){
            return res.json({success:false, message:"Something went wrong while publishing blog!"})
        }
        const myCloud = await cloudinary.v2.uploader.upload(dataUri.formated.content);
        const blog = new blogModel({
            title,
            content,
            cover: myCloud.secure_url,
            isPublished:true,
            createdAt: Date.now(),
            createdBy: {
                id: req.userId,
                name: req.name
            }
        })
        await blog.save();
        res.json({success:true, message:"Blog created successfully!"})
    }
    catch(error){
        return res.status(400).json({success:false, message:"Something went wrong while publishing blog!"})

    }
}