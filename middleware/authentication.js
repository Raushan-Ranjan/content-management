const CustomError = require('../errors')
const {isTokenValid} = require('../utils/jwt')

const authenticateUser = async(req,res,next) => {
    const token = req.headers.token;
    if(!token){
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
    try {
        const {name,userId,role,email} = isTokenValid({token});
        req.user = {name,userId,role,email};
        next(); 
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }
}


const authorizedUser = (...roles) => {
    return async (req,res,next) => {
        if(!roles.includes(req.user.role)){
            throw new CustomError.ForbiddenError('Not authorized to access this route');
        }
        next();
    }
}

module.exports = {authenticateUser,authorizedUser};