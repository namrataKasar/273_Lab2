var express = require('express');
var assignments = express.Router();
var cors = require('cors');

var datetime = require('node-datetime');

const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

assignments.use(cors());
const Assignment = require('../models/Assignment');
const Course = require("../models/Course");
const User = require("../models/User");

assignments.post('/assignment/create', (req, res)=>{
    console.log("In Assignments");


    var currentTime = datetime.create();
    console.log(new Date(currentTime.getTime()));
    var saveTime = new Date(currentTime.getTime());
    console.log(req.body.data.title);

    console.log(req.body)
    Assignment.findOne({
        where:{
            TITLE: req.body.data.title
        }
    })
    .then(assignment => {
        if(!assignment) {
            const newAssignment =  new Assignment({
                TITLE:req.body.data.assignmentTitle,
                TOTAL_POINTS:req.body.data.totalPoints,
                DUE_DATE:req.body.data.dueDate,
                TIME_CREATED:saveTime,
                FILE_PATH: req.body.data.fileUploaded
            })
            newAssignment.save()
            .then(assignment => {
                Course.findOne({
                    COURSE_ID:req.body.data.courseId
                })
                .then(course => {
                    course.ASSIGNMENTS.push(assignment);
                    course.save()
                    .then(course => {
                        Course.findOne({
                            COURSE_ID: course.COURSE_ID
                        })
                        .populate({
                            path: 'ASSIGNMENTS'
                        })
                        .exec((err, newCourse) =>{
                            if(err) 
                                console.log(err);
                            else 
                            res.json({
                                course : newCourse,
                                message : "Course with ID " + newCourse.COURSE_ID + " created successfully!!"
                            }) 
                        });
                    })
                })
            })
        }
    })
    .catch(error =>{
        res.json({error : "Title already exists"});
    })

    
})

assignments.post('/course/getAssignments', (req, res) => {
    console.log("_________________________________")
    console.log(req.body.data);
    Course.findOne({
        COURSE_ID : req.body.data.courseId 
    })
    .populate({
        path: 'ASSIGNMENTS'
    })
    .exec((err, newCourse) =>{
        if(err) 
            console.log(err);
        else 
        res.json({
            course : newCourse
        }) 
    });

})

assignments.post('/assignment/submit', (req, res) => {

    console.log("In submision ---------")
    console.log(req.body.data);
    User.findOne({
        SJSU_ID : req.body.data.sjsuID
    })
    .then(user => {
        console.log("**********")
        console.log(user)
        user.SUBMISSIONS.push(req.body.data.assignment);
        user.FILE_PATH = req.body.data.fileUploaded;
        user.save()
        .then(newUser => {
            Assignment.findOne({
                _id : assignment._id
            })
            .then(assign => { 
                res.json({
                    
                })
            })
    })

    })
})

//Upload assignment file
assignments.post('/assignment/upload', (req, res) => {

   //File upload starts
    console.log(req.get('courseId'));
    var userFolder = 'namcanvas' + '/' + req.get('courseId') + '/Assignments';
    
    aws.config.update({
        accessKeyId :'AKIAZC7CQASPVATLUEXY',
        secretAccessKey : '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',
        region : 'us-west-1',
        
    })
    
    const s3 = new aws.S3({    
        sslEnabled: false,
    });
    
    const upload = multer({
        storage: multerS3({
          s3: s3,
          acl: 'public-read',
          bucket: userFolder,
          contentType: multerS3.AUTO_CONTENT_TYPE,
          key: function (req, file, cb) {
            cb(null, Date.now().toString())
          }
        })
      })

      const singleUpload = upload.single('assignmentFile');

      singleUpload(req, res, function(err){
        console.log(req.file);
        if (err) {
            return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
        }
        return res.json({
            imageURL : req.file.location,
        });
    })


})



module.exports = assignments;