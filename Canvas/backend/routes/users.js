var express = require('express');
const users = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var jwt = require('jsonwebtoken');
const keys = require('../config/keys');
// var gravatar = require('gravatar');

//Model
const User = require('../models/User');
var upload = require('../config/uploadService');

const singleUpload = upload.single('profileImage');

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
    const params = {
      ACL: 'public-read',
      Body: buffer,
      Bucket: '',
      ContentType: type.mime,
      Key: `${name}.${type.ext}`
    };
    return uploadService.s3.upload(params).promise();
  };

//Signup
users.post('/signup', (req,res) => {
    // console.log(req.body.data);
    const {sjsuID, firstName, lastName, password, isStudent, email} = req.body.data;
    // console.log('Hello in Signup ', sjsuID);

    User.findOne({
        SJSU_ID: sjsuID
    })
    .then(user => {
        if(user)
        {
            console.log("Already exists")
            code = "ER_DUP_ENTRY";
            message = 'User with this ID already exists!!!';
            var jsonData = {
                code: code,
                message: message,
            }
            console.log(jsonData);
            res.json(jsonData);
        }
        else
        {
            // const avatar = gravatar.url(req.body.email, {
            //     s: '200', //Size
            //     r: 'pg', //Rating
            //     d: 'mm', //Default
            //     })
            const newUser = new User({
                SJSU_ID : sjsuID,
                FNAME : firstName,
                LNAME : lastName,
                EMAIL : email,
                IS_STUDENT : isStudent,
                PASSWORD : password
            })
            console.log(newUser);
            //Encrypt password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.PASSWORD, salt, (err, hash) => {
                    if(err)
                    {
                        throw err;
                    }
                    else
                    {
                        newUser.PASSWORD = hash;

                        newUser.save()
                        .then(user => {
                            res.json({user});
                        })
                        .catch(error => {
                            res.json({error});
                        })
                    }
                })
            })
        }
    })
})

//Login
users.post('/login', (req, res) => {
    console.log(req.body);
    const {sjsuID,password} = req.body.data;
    // console.log('Hello in Signup ', sjsuID);

    User.findOne({
        SJSU_ID: sjsuID
    })
    .populate('COURSES')
    .exec()
    .then(user => {
        if(!user) 
        {
            return res.status(404).json({message: 'User not found'})
        }
        //Check Password
        bcrypt.compare(password, user.PASSWORD)
        .then(isMatch => {
            if(isMatch){
                
                const payload = { sjsuID : user.SJSU_ID} 
                secretOrKey = keys.secretOrKey;
                //Create jwt payload to send with jwt token
                //Sign token take in two parameters first is the payload that we created above
                //and the secret key
                jwt.sign(payload, secretOrKey, {expiresIn: 8*3600}, (err, token) => {
                res.json({
                    success: true,
                    token: token,
                    user: user,
                    message: "Success"
                    })
                });
                // res.json({message: "Success"})
            } 
            else 
            {
            return res.status(400).json({message : 'Password Incorrect'})
            }
        })
        })
})

//Get User Details : Profile
users.post('/user/details', (req, res) => {
    console.log(req.body);
    const {sjsuID} = req.body.data;
    console.log('Hello in Userdetails ', sjsuID);

    User.findOne({
        SJSU_ID: sjsuID
    })
    .then(user => {
        if(!user) 
        {
            return res.status(404).json({message: 'Some error occurred'})
        }
        res.json({user});
        })
})

//Update User Details : Edit Profile
//Update user details
users.put('/user/update', (req, res) => {
    // const today = new Date();
    console.log('--------------------------------')
    console.log(req.body.data);
    console.log('--------------------------------')

    const userInfo = req.body.data;
    console.log(typeof(userInfo.PROFILE_PIC));
    User.findOne({
        SJSU_ID : req.body.data.sjsuID
    })
    .then(user => {
        user.FNAME = userInfo.fName;
        user.LNAME = userInfo.lName;
        user.SJSU_ID = userInfo.sjsuID;
        user.EMAIL = userInfo.email;
        user.PHONE_NO = userInfo.phoneNo;
        user.SCHOOL = userInfo.school;
        user.GENDER = userInfo.gender;
        user.CITY = userInfo.city;
        user.COUNTRY = userInfo.country;
        user.HOMETOWN = userInfo.hometown;
        user.COMPANY = userInfo.company;
        user.LANGUAGE = userInfo.language;
        user.ABOUT_ME = userInfo.aboutMe;
        user.PROFILE_PIC = userInfo.profilePic;

        user.save(error => {
            if(error)
            {
                throw error;
            }
        })

        code = 200;
        message = 'OK';
        response = "Details of '"+user.SJSU_ID+"' are successfully updated.";
        res.json({
            code: code,
            message: message,
            response: {
                msg: response,
                data: user
            }
        });
    })
    .catch(err => {
        code = 500;
        response = err;

        res.json({
            code: code,
            response: {
                msg: response
            }
        });
    })
});

//Get all users (for Inbox)
users.get('/getAllUsers', (req, res) => {
    User.find({}, function(err, users) {
        // var userMap = {};
    
        // users.forEach(function(user) {
        //   userMap[user._id] = user;
        // });
    
        res.json({users});  
      });
})

//Upload profile image
users.post('/profile/upload', (req, res) => {

    const checkIn = req;
    singleUpload(req, res, function(err){
        console.log(req.file);
        if (err) {
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
        }
        return res.json({
            imageURL : req.file.location,
        });
    })
})

//Logout
users.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = users;