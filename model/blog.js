const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcryptjs');

const BlogSchema = new mongoose.Schema({
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
    },
    title:{
        type:String,
        required:[true,'name can\'t be empty'],
        minlength:5,
        maxlength:100
    },
    description:{
        type:String,
        required:[true,'email can\'t be empty'],
        minlength:10,
    },
    status:{
        type:String,
        enum:['under review','approved'],
        default:'under review'
    }
})

// UserSchema.pre('save',async function() {
//     const genSalt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password,genSalt)
// })

// UserSchema.methods.comparePassword = async function(pass){
//     const isMatch = await bcrypt.compare(pass,this.password);
//     return isMatch;
// }
module.exports = mongoose.model('Blog',BlogSchema);