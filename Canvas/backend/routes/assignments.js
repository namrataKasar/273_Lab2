var express = require('express');
var assignments = express.Router();
var cors = require('cors');

var datetime = require('node-datetime');

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
        //     User.findOne({
        //         SJSU_ID : newUser.SJSU_ID
        //     })
        //     .populate('SUBMISSIONS.ASSIGNMENTS'
        //     //     {
        //     //     path:'SUBMISSIONS',
        //     //     populate: {path: 'ASSIGNMENTS' }
        //     // }
        //     )
        //     .exec((err, upUser) => {
        //         if(err)
        //         {
        //             throw err;
        //         }
        //         console.log("**********")
        //         console.log(upUser);
        //         res.json({
        //             user : upUser
        //         })
        //     });
        // })
        // .catch(error => {
        //     res.json(error);
        // })
    })

})

module.exports = assignments;