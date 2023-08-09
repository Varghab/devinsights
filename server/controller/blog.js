const cloudinary  = require('cloudinary');
const { blogModel } = require('../model/blog.model');
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
        const {title, content, tag} = req.body;
        const dataUri = getDataUri(req.file);
        if(!dataUri.success){
            return res.json({success:false, message:"Something went wrong while publishing blog!"})
        }
        const myCloud = await cloudinary.v2.uploader.upload(dataUri.formated.content);
        const blog = new blogModel({
            title,
            content,
            tag,
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

exports.getSingleBlog = async(req,res) =>{
    const id = req.params.id;
    try {
        const blog = await blogModel.findById({_id:id});
        res.status(200).json({success:true, message:blog})
    } catch (error) {
        res.status(400).json({success:false, message:"No such blog exists!"})
    }
}
exports.getMyBlogs = async(req,res) =>{
    try {
        const myBlogs = await blogModel.find({'createdBy.id':req.userId});
        res.status(200).json({success:true, message: myBlogs});
    } catch (error) {
        res.status(400).json({success:false, message:"Login first to create your blogs!"})
    }
}

exports.deleteBlog = async(req,res) =>{
    const id = req.params.id;
    try {
        if(req.userId){
            const response = await blogModel.deleteOne({_id:id});
            res.json({success:true, message:"Blog successfully deleted!", response})
        }
    } catch (error) {
        res.json({success:false, message:"Something went wrong, please try again!"})
    }
}

exports.updateBlog = async(req,res) =>{
    const id = req.params.id;
    const { title, content, tag, cover } = req.body;
    let response;
    try {
        if(req.userId){
            if(req.file){
                const fileDate = getDataUri(req.file);
                if(!fileDate.success){
                    return res.json({success:false, message:"Something went wrong while publishing blog!"})
                }
                const myCloud = await cloudinary.v2.uploader.upload(fileDate.formated.content);
                response = await blogModel.findOneAndUpdate({_id:id},{
                    title,
                    content,
                    tag,
                    cover: myCloud.secure_url
                })
            }
            else {
                response = await blogModel.findOneAndUpdate({_id:id},{
                    title,
                    content,
                    tag,
                    cover,
                    isPublishsed:true,
                    createdBy: {
                        id: req.userId,
                        name: req.name
                    }
                },{new:false})
            }
            res.status(200).json({success:true, message:"Blog updated successfully!", response})
        }
    } catch (error) {
        res.status(200).json({success:false, message:"Something went wrong, please try again!"})
    }
}
