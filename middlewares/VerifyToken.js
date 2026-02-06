const jwt = require("jsonwebtoken");



//Verify Token
function verifyToken(req, res, next){

    // get token from headers
    let token = req.headers.token;
    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2 && /^Bearer$/i.test(parts[0])) token = parts[1];
    }
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({message :error.details[0].message })
        }
    }else{
        res.status(401).json({message : "no token"})
    }
}

//verify Token & Authorization the user
function verifyTokenAndAuthorization(req, res, next){
    verifyToken(req,res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
        return res.status(403).json({message : "you are not allowed to this account"});
        }
    
})}

//verify Token & Admin 
function verifyTokenAndAdmin(req, res, next){
    verifyToken(req,res, () => {
        if(req.user.isAdmin){
            next();
        }else{
        return res.status(403).json({message : "you are not allowed only Admin"});
        }
    
})}



module.exports = {verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
};