const Blog = require('../model/blog');
const User = require('../model/user');

const CustomError = require('../errors');


const createBlog = async ( req, res ) => {
const {title,description} = req.body;
if(!title || !description){
    throw new CustomError.BadRequestError('title and description can\'t be empty');
}
const {name,email,role} = req.user;

let status = role === 'admin' ? 'under review' : 'approved';

const blog = await Blog.create({title,description,name,email,status});
res.status(201).json({blog,status:'created successfully'});
}

const getAllBlog = async ( req, res ) => {
    
    const {role} = req.user;
    let query = {}
    if(role !== 'super admin'){
     query['status'] = 'approved';
    }
    const blog = await Blog.find({...query});
    res.status(201).json({blog,totalRecords:blog.length,user:req.user});
}

const getBlogById = async ( req, res ) => {
    const {id} = req.params;
    const blog = await Blog.findOne({_id:id});
    if(!blog){
        throw new CustomError.NotFoundError(`no blog found for id ${id}`);
    }
    res.status(201).json({blog,user:req.user});
}

const deleteBlog = async ( req, res ) => {
    const {id} = req.params;
    const blog = await Blog.findByIdAndDelete({_id:id});
    if(!blog){
        throw new CustomError.NotFoundError(`no blog found for id ${id}`);
    }
    res.status(201).json({blog});
}

const isPublishBlog = async (req,res) => {
    const {id} = req.params;
    const {role} = req.user;
    const blog = await Blog.findOne({_id:id});
    if(!blog){
        throw new CustomError.BadRequestError(`No blog found with id ${id}`);
    }

    if(blog.status !== 'under review'){
        throw new CustomError.BadRequestError('this blog is already approved');
    }
    blog.status = 'approved';
    const blogUpdate = await Blog.findByIdAndUpdate({_id:id},{...blog},{new:true,runValidators:true});
    res.status(201).json({blogUpdate});
    
}

const giveAdminAccess = async(req,res) => {
    const {email,role} = req.body;

    const isEmailExist = await User.findOne({email});
    if(!isEmailExist){
        throw new CustomError.BadRequestError('Email dosen\'t exist, put right email !')
    }

    if(role === isEmailExist.role){
        throw new CustomError.BadRequestError(`user is already ${role}`);
    }
 
    const user = await User.findByIdAndUpdate(isEmailExist._id,{role},{new:true,runValidators:true});

    res.status(201).json({name:user.name,role:user.role});
}

const updateBlog = async(req,res) => {
    const {id} = req.params;
    const {title,description} = req.body;
    const {role} = req.user;
    const status = role === 'super admin' ? 'approved': 'under review';
    const blog = await Blog.findOne({_id:id});
    if(!blog){
        throw new CustomError.BadRequestError(`No blog found with id ${id}`);
    }
    blog.title = title;
    blog.description = description;
    blog.status = status;
    const blogUpdate = await Blog.findByIdAndUpdate({_id:id},{...blog},{new:true,runValidators:true});
    res.status(201).json({blogUpdate});
}


module.exports = { giveAdminAccess , createBlog, isPublishBlog, getAllBlog,getBlogById,deleteBlog,updateBlog}