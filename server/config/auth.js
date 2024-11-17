const jwt = require("jsonwebtoken");

module.exports.checkToken = async (req, res, next)=>{
    try {
        const authheader = req.headers['authorization'];
        const token = authheader && authheader.split(' ')[1];
        if(!token){
            return res.status(401).json({ message: 'No token provided' });
        }
        jwt.verify(token, process.env.secret, (err, user)=>{
            if(err){
                return res.status(400).json({
                    message: "Token is expire"
                })
            }
            req.user = user;
        })
        next()
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in authenticating the user!",
            success: false
        })
    }
}