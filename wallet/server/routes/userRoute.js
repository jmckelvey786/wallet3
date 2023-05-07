const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authmiddleware');


//register user account
router.post('/register', async (req, res) => {
    try{
        //check for duplicate user
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.send(
                {
                    success: false,
                    message: "User Already Exists"
                }
            )
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        res.send(
            {
                message: "User Created Successfully",
                data: null,
                success: true,
            }
        )
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
});

//logiun user Account

router.post('/login', async (req, res) => {
    console.log(process.env.jwt_secret);
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.send({
                success: false,
                message: "User Does Not Exist"
            });
        }

        //check if password is valid
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
            return res.send(
                {
                    success: false,
                    message: "Invalid Password"
                }
            )
        }

        //generate token
        // const token = jwt.sign({userId: user._id}, process.env.jwt_secret, {expiresIn: "1d"});
        const token = jwt.sign({userId: user._id}, 'wallet', {expiresIn: "1d"});
        res.send(
            {
                message: "User Logged In Successfully",
                data: token,
                success: true,
            });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
})

//get user info

router.post("/get-user-info", auth, async (req, res)=> {
    try{
        const user = await User.findById(req.body.userId);
        user.password = " ";
        res.send(
            {
                message: "User info retrieved",
                data: user,
                success: true,
            }
        );
    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }
});

module.exports = router;