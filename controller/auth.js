const User = require('../model/user');
const CustomError = require('../errors');
const {attachCookiesToResponse,isTokenValid} = require('../utils/jwt');
const blog = require('../model/blog');

const loginController = async(req,res) => {
    const {email,password,question,answer}  = req.body;

    if(!email || !password){
        throw new CustomError.BadRequestError('Email or Password can\'t be empty')
    }

    const user = await User.findOne({email});

    if(!user){
        throw new CustomError.UnauthenticatedError('Invalid Credential');
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch || question !== user.question || answer !== user.answer){
        throw new CustomError.UnauthenticatedError('Invalid Credential');
    }
    const data = {name:user.name,userId:user._id,role:user.role,email:user.email};
    const token = attachCookiesToResponse({res,user:data})
    res.status(201).json({data,token});

}


const logoutController = async(req,res) => {
    res.cookie('token','logout',{
        httpOnly:true,
        expires: new Date(Date.now()),
    })
    res.status(200).json('user logout successfully ...')
}


const registerController = async(req,res) => {
    const {email,name,password,question,answer} = req.body;
    const isEmailExist = await User.findOne({email});
    if(isEmailExist){
        throw new CustomError.BadRequestError('Email already exist, try with another !')
    }

    const user = await User.create({email,name,password,question,answer});
    const data = {name:user.name,userId:user._id,role:user.role,email:user.email};
    const token = attachCookiesToResponse({res,user:data})
    res.status(201).json({data,token});
}

module.exports = {loginController, logoutController, registerController}