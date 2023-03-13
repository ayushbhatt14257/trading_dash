const jwt = require('jsonwebtoken');
const User = require("../models/userSchema");


exports.requireSignIn = async(req, res, next) => {
    try {
        const token = req.cookies.jwttoken;
        const verfiyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({ _id: verfiyToken._id, "tokens.token": token });

        if (!rootUser) { throw new Error('user Not Found') }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();


    } catch (error) {
        res.status(401).send('Unauthorized: No Token Provided');
        console.log(error);
    }
}

// ADMIN ACCESS 
exports.isAdmin = async(req, res, next) => {
    try {
        const user = await User.findById({ _id: req.userID });
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                messgae: "Unauthorized",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            messgae: "error in admin middleWare"
        })
    }
}