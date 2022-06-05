const JWT = require('jsonwebtoken');

const createJWT = ({payload})  => {
    const token = JWT.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'});
    return token;
}

const isTokenValid = ({token}) =>  JWT.verify(token,process.env.JWT_SECRET);

const attachCookiesToResponse = ({res,user}) => {
    const token = createJWT({payload:user});
    const expireTime = 3600 * 24 * 1000; 
    return {token, expireTime}
    // res.locals.token = token;
    // res.cookie('token',token,{
    //     httpOnly:true,
    //     expires: new Date(Date.now() + expireTime),
    //     secure:process.env.NODE_ENV === 'production',
    //     signed:true
    // })
    // res.status(201).json({user});
}

module.exports = { createJWT, isTokenValid,attachCookiesToResponse}