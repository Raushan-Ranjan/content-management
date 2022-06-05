const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name can\'t be empty'],
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:[true,'email can\'t be empty'],
        validate:{
            validator : validator.isEmail,
            message:'Please provide valid email',
        },
        unique:true
    },
    password:{
        type:String,
        required:[true,'password can\'t be empty'],
        minlength:6,
    },
    role:{
        type:String,
        enum:['admin','user','super admin'],
        default:'user'
    },
    question:{
        type:String,
        enum:['What city were you born in?','What’s your favorite movie?','What was your first car?','What was your favorite school teacher’s name?'],
        required:['true','Questions field can\'t be empty']
    },
    answer:{
        type:String,
        required: ['true','choose above question and answer here.']
    }
})

UserSchema.pre('save',async function() {
    const genSalt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,genSalt)
})

UserSchema.methods.comparePassword = async function(pass){
    const isMatch = await bcrypt.compare(pass,this.password);
    return isMatch;
}
module.exports = mongoose.model('User',UserSchema);