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
    console.log(req.body.data.assignmentTitle);

    console.log(req.body)
    Assignment.findOne({
        where:{
            TITLE: req.body.data.assignmentTitle,
            COURSE: req.body.data.courseId
        }
    })
    .then(assignment => {
        if(!assignment) {
            const newAssignment =  new Assignment({
                TITLE:req.body.data.assignmentTitle,
                TOTAL_POINTS:req.body.data.totalPoints,
                DUE_DATE:req.body.data.dueDate,
                TIME_CREATED:saveTime,
                FILE_PATH: req.body.data.fileUploaded,
                COURSE: req.body.data.courseId
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
                                // message : "Course with ID " + newCourse.COURSE_ID + " created successfully!!"
                            }) 
                        });
                    })
                })
            })
        }
        else
        {
            res.json({
                message : "Assignment with this title already exists."
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
    var currentTime = datetime.create();
    console.log(new Date(currentTime.getTime()));
    var saveTime = new Date(currentTime.getTime());
    console.log(req.body.data);
    const reqData = req.body.data;
    Assignment.findOne({
        TITLE : reqData.assignment.TITLE,
        COURSE : reqData.courseId
    })
    .then(assignment => {
        var flag = true;
        var index;
        if(assignment.SUBMISSIONS.length > 0)
        {
            for(var i = 0; i < assignment.SUBMISSIONS.length; i++)
            {
                if(assignment.SUBMISSIONS[i].FILE_PATH == reqData.fileUploaded)
                {
                    console.log("Dulicate");
                    flag = false;
                    inedx = i;
                }
            }
        }
        var sub = {
            FILE_PATH: reqData.fileUploaded,
            DATE: saveTime,
            SJSU_ID: reqData.sjsuID,
            STUDENT_NAME: reqData.sName
        }
        if(flag)
        {
            assignment.SUBMISSIONS.push(sub);
        }
        else
        {
            assignment.SUBMISSIONS[index] = sub;
        }
        assignment.save()
        .then(as => {
            User.findOne({
                SJSU_ID : reqData.sjsuID
            })
            .then(user => {
                var asDetails = {
                    AS_TITLE: as.TITLE,
                    COURSE_ID: reqData.courseId
                }
                user.SUBMISSIONS.push(asDetails);
                user.save()
                .then(newUser => {
                    res.json({
                        user : newUser
                    })
                })
            })
        })
        .catch(error => {
            res.json({error});
        })
    })
})

assignments.post('/assignment/getSubmissions', (req, res) => {

    console.log("In get Submissions ---------");
    console.log(req.body.data);
    const reqData = req.body.data;
    Assignment.findOne({
        TITLE : reqData.assignment.TITLE,
        COURSE : reqData.courseId
    })
    .then(assignment => {
        res.json({assignment});
    })
    .catch(error => {
        res.json({error});
    })
})

assignments.post('/assignment/submitGrades', (req, res) => {

    console.log("In submit grades ---------");
    console.log(req.body.data);
    const reqData = req.body.data;
    User.findOne({
        SJSU_ID : reqData.sjsuID,        
    })
    .then(user => {
        
        var flag = true;
        var index;
        if(user.GRADES.length > 0)
        {
            for(var i = 0; i < user.GRADES.length; i++)
            {
                if(user.GRADES[i].NAME == reqData.assignmentName && user.GRADES[i].COURSE_ID == reqData.courseId)
                {
                    console.log("Dulicate");
                    flag = false;
                    inedx = i;
                }
            }
        }
        const grade = {
            COURSE_ID: reqData.courseId,
            NAME: reqData.NAME,
            SCORE: reqData.score,
            OUT_OF: reqData.totalPoints,
            DUE_DATE: reqData.dueDate,
        };
        if(flag)
        {
            user.GRADES.push(grade);
        }
        else
        {
            user.GRADES[index] = grade;
        }

        user.save()
        .then(newUser => {
            Assignment.findOne({
                TITLE : reqData.assignmentName,
                COURSE : reqData.courseId
            })
            .then(as => {
                if(as.SUBMISSIONS.length > 0)
                {
                    for(var i = 0; i < as.SUBMISSIONS.length; i++)
                    {
                        if(as.SUBMISSIONS[i].SJSU_ID == reqData.sjsuID)
                        {
                            as.SUBMISSIONS[i].GRADES = reqData.score
                        }
                    }
                }
                as.save()
                .then(subAs => {
                    // console.log(subAs.SUBMISSIONS);
                    res.json({
                        assignment : subAs,
                        user : newUser
                    })
                })
            })
            // res.json({user : newUser});
        })
        .catch(error => {
            res.json({error});
        })
        
    })
    .catch(error => {
        res.json({error});
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

assignments.post('/assignment/submission/upload', (req, res) => {

    //File upload starts
     console.log(req.get('courseId'));
     var userFolder = 'namcanvas/submissions/' + req.get('courseId') + "/" + req.get('assignmentId');
     
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
             cb(null, req.get('studentID'))
           }
         })
       })
 
       const singleUpload = upload.single('submissionFile');
 
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