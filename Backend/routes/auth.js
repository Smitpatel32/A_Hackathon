// require("dotenv").config()
const express = require("express");
const router = express.Router();
const User = require('../models/login')
const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcrypt');
// var jwt = require('jsonwebtoken');
// const JWT_STRING = "Satuupatuu"
// const fetchToken = require("../middleware/login");
// const Token = require("../models/Token")
// const sendEmail = require("./sendEmail")

// .......................Create User...............................
router.post("/create-user", [
    body('name', "Enter a valid Name").trim().notEmpty(),
    body('email', "Enter a valid Email").trim().notEmpty().isEmail(),
], async (req, res) => {
    let success= false
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.send({success, errors: result.array() });
    }
    else {
        try {

// Comparing if same email exists or not
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success, errors: "User with email already exists" });
            }

// if same email doesn't exists create a new user and add to db
               user = await User.create({
                    name: req.body.name,
                    email: req.body.email,             
                })

// creating token.
                const data = {
                    user: {
                        id: user.id
                    }
                } 
                res.json("data stored")
                // const authToken = jwt.sign(data,JWT_STRING);
                // let token = await Token.create({
                //     userId : user.id,
                //     token : authToken
                // })
// // sending email 
//                 const url = `${process.env.BASE_URL}api/auth/${user._id}/verify/${token.token}`
//                 await sendEmail(user.email,"verify Email",url)
//                 success = true
//                 res.json({success,authToken,message:"An Email sent to your account Verify it."})

        } catch (error) {
            console.log(error)
            res.status(500).json({success,errors:"some error occured"})
        }
    }
})

module.exports = router