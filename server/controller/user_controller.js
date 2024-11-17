const User = require("../model/user");
const {validate} = require("../config/validator")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message: "kindly fill the require details!",
                success: false
            })
        }
        let user = await User.findOne({email: email});
        if(user){
            return res.status(401).json({
                message: "email is already exist",
                success: false
            })
        }
        if(!validate(password)){
            return res.status(402).json({
                message: "Password must contain 6 characters or at least one uppercase, one lowercase, one number and one special character",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        return res.status(200).json({
            message: "User register successfully!!",
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in registring the User!",
            error: error.message
        })
    }
}

module.exports.signin = async (req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "kindly fill the required things!",
                success: false
            })
        }
        let user = await User.findOne({email: email});
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({
                message: "email or password does not match!",
                success: false
            })
        }
        let token = jwt.sign(user.toJSON(),process.env.secret, {expiresIn: '1h'});
        return res.status(200).json({
            message: "You have LoggedIn Successfully!",
            success: true,
            token
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in signing the user",
            success: false,
            error: error.message
        })
    }
}
