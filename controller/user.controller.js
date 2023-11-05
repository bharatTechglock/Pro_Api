const { user, Sequelize } = require("../models");
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv =  require('dotenv').config();
const secretKey = process.env.SECRET_KEY;



let self = {};

/**
* @description Get All Users
* @type GET
* @path /api/users
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.getAll = async (req, res) => {}

/**
* @description Create New User
* @type POST
* @path /api/users/
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.createUser = async (req, res) => {
    try {
        const { name, email,password,user_type } = req.body;

        // Check if req.body is null or empty
        if (!name) {
          return res.status(400).json({ error: 'Name is required!' });
        }else if(!email){
          return res.status(400).json({ error: 'Email is required!' });
        }else if(!password){
            return res.status(400).json({ error: 'Password is required!' });
        }else if(!user_type){
            return res.status(400).json({ error: 'User type is required!' });
        }
        // Check if the email already exists in the database
        const existingUser = await user.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        // console.log(req.body); return false;

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            user_type: req.body.user_type
        };
        let data = await user.create(newUser);
        if(data){
        // Generate a random 4-digit OTP
        function generate4DigitOTP() {
            const min = 1000; // Minimum 4-digit number (inclusive)
            const max = 9999; // Maximum 4-digit number (inclusive)
            
            const otp = Math.floor(Math.random() * (max - min + 1)) + min;
            return otp.toString();
        }
        const otp = generate4DigitOTP()
        const userData = await user.findByPk(data.id);
        userData.otp = otp;   
        await userData.save();
        }
        return res.status(201).json({
            success: true,
            data: data,
            message: 'User registered!.'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error,
            message: error.message
        });
    }      
}
/**
* @description Get Single User info by id
* @type GET
* @path /api/users/:id
* @param {*} req
* @param {*} res
* @param {Number} — id — user id
* @returns JSON
*/
self.get = async (req, res) => {}
/**
* @description Update User data
* @type PUT
* @path /api/users/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.updateUser = async (req, res) => {
    
}
/**
* @description Delete user with the specified id in the request
* @type DELETE
* @path /api/users/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.delete = async (req, res) => {}
/**
* @description Delete all users from the database
* @type DELETE
* @path /api/users/
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.deleteAll = async (req, res) => {};


/**
* @description verify otp with email from the user table 
* @type Auth verify
* @path /api/users/verifyOtp/
* @param {*} userEmail
* @param {*} otpToVerify
* @returns JSON
*/

self.verifyOTP  = async (req, res) => {
  try {
    // Find the user by ID
    let email = req.body.email;
    let otpToVerify = req.body.otp;
    // Check if req.body is null or empty
    if (!email) {
        return res.status(400).json({ error: 'Email is required!' });
    }else if(!otpToVerify){
        return res.status(400).json({ error: 'Otp is required!' });
    }
    const findUser = await user.findOne({ where: { email } });
    if (findUser) {
        // Check if the provided OTP matches the one in the database
        if (findUser.otp == otpToVerify) {
            // If OTP matches, reset the OTP to null (or any other desired value)
            // findUser.otp = null;
            // await findUser.save();
            // Generate an authentication token
            const authToken = generateAuthToken(user);

            return res.status(200).json({
                success: true,
                data: authToken,
                message: 'OTP is verified and login successfully!.'
            });
        } else {
            return res.status(400).json({ error: 'Incorrect OTP!' });
        }
    }else {
        return res.status(400).json({ error: 'Email is not exists!' });
    }
  } catch (error) {
    return res.status(500).json({
        success: false,
        error: error,
        message: error.message
    });
  }
}

//genarate token
function generateAuthToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      // Add other user claims or data you want in the token payload
    };
  
    const secret_key = secretKey; // Replace with a strong secret key
    const options = {
      expiresIn: '2h', // Token expiration time (e.g., 1 hour)
    };
  
    return jwt.sign(payload, secret_key, options);
  }

module.exports = self;