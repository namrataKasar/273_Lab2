var express = require('express');
const courses = express.Router();
const passport = require('passport');

const Course = require('../models/Course');
const User = require('../models/User')

courses.post('/course/create',  (req, res) => {
    
    const data = req.body.data;
    
    User.findOne({
        SJSU_ID: data.sjsuID
    })
    .then(user => {
        Course.findOne({
            COURSE_ID : data.courseId
        })
        .then(course => {
            if(course)
            {
                res.json({
                    status : 500,
                    code : "ERR_DUP_ENTRY",
                    message : "Course with this ID already exists"
                })
            }
            else
            {
                console.log("In else Course")
                const newCourse = new Course({
                    COURSE_ID: data.courseId,
                    COURSE_NAME: data.courseName,
                    DEPARTMENT: data.courseDept,
                    DESCRIPTION: data.courseDescription,
                    COURSE_ROOM: data.courseRoom,
                    COURSE_CAPACITY: data.courseCapacity,
                    WAITLIST_CAPACITY: data.waitlistCapacity,
                    TERM: data.courseTerm,
                    CREATED_BY: user 
                })
                
                newCourse.save()
                .then(course => {
                    console.log("User save");
                    user.COURSES.push(course);
                    user.save()
                    .then(user => {
                        console.log("Course save");
                        User.findOne({
                            SJSU_ID: data.sjsuID
                        })
                        .populate({
                            path: 'COURSES',
                            populate: {
                                path: 'CREATED_BY',
                                model: 'User'
                            }
                        })
                        .exec((err, newUser) =>{
                            if(err) 
                                console.log(err);
                            else 
                            res.json({
                                user : newUser,
                                message : "Course with ID " + course.COURSE_ID + " created successfully!!"
                            }) 
                        });
                                          
                    })
                    .catch(error => {
                        res.json({error})
                    })
                })
                .catch(error => {
                    res.json({error})
                })
            }
        })
    })
})

//Search by Course Name
courses.post('/course/search/name',  (req, res) => {
    console.log("Hello");
    console.log(req.body.data.courseName);
    Course.find({
        COURSE_NAME:req.body.data.courseName
    })
    .then(course => {
        console.log("Course");
        console.log(course);
        if(course)
        {
            
            res.json({course})
        }
        else
        {
            res.json({message : "Course not found"})
        }
    })
    .catch(error => {
        res.json({error : "Course not found!!"})
    })
    
})

//Search by term
courses.post('/course/search/term',  (req, res) => {
    
    Course.find({
            TERM:req.body.data.courseTerm,
            DEPARTMENT:req.body.data.courseDept
    })
    .then(course => {
        if(course)
        {
            res.json({course})
        }
        else
        {
            res.json({message : "Course not found"})
        }
    })
    .catch(error => {
        res.json({error : "Course not found!!"})
    })
    
})

//Search courses by course ID
courses.post('/course/search/id', (req, res) => {

    const dept = req.body.data.courseDept;
    const courseFilter = req.body.data.courseFilter;
    const courseId = req.body.data.courseId;

    if(courseFilter == "is exactly")
    {
        Course.find({
            COURSE_ID:courseId,
            DEPARTMENT:dept
        })
        .then(course => {
            if(course)
            {
                res.json({course})
            }
            else
            {
                res.json({message : "Course not found"})
            }
        })
        .catch(error => {
            res.json({error : "Course not found!!"})
        })
    }
    else if(courseFilter == "greater than or equal to")
    {
        Course.find({
            COURSE_ID: {
                $gte : courseId,
            },
            DEPARTMENT:dept
        })
        .then(course => {
            if(course)
            {
                res.json({course})
            }
            else
            {
                res.json({message : "Course not found"})
            }
        })
        .catch(error => {
            res.json({error : "Course not found!!"})
        })
    }
    else if(courseFilter == "less than or eqaul to")
    {
        Course.find({
                COURSE_ID: {
                    $lte : courseId,
                },
                DEPARTMENT:dept
        })
        .then(course => {
            if(course)
            {
                res.json({course})
            }
            else
            {
                res.json({message : "Course not found"})
            }
        })
        .catch(error => {
            res.json({error : "Course not found!!"})
        })
    } 
})

//Get all students registered for course
courses.post('/getStudentsByCourse', (req, res) => {
    Course.findOne({
        COURSE_ID: req.body.data.courseId
    })
    .populate('STUDENTS_ENROLLED')
    .exec()
    .then(course => {
        res.json({course});
    })
    .catch(error=> {
        console.log(error);
    })
})

//Get details of course
courses.post('/course/details', (req, res) => {
    Course.findOne({
        COURSE_ID: req.body.data.courseId
    })
    .populate('STUDENTS_ENROLLED', 'CREATED_BY')
    .exec()
    .then(course => {
        res.json({course});
    })
    .catch(error=> {
        console.log(error);
    })
})

module.exports = courses;