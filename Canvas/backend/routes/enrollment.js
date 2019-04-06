var express = require('express');
var enrollment = express.Router();
const passport = require('passport');

const Course = require('../models/Course');
const User = require('../models/User');

enrollment.post('/courses/add1', (req, res) => {

    const enrollmentDetails = {
        COURSE_ID : req.body.data.courseId,
        SJSU_ID : req.body.data.sjsuID
    }
    let totalEnrollment = 0;
    let courseCapacity = 0;
    let courseEnrolled = null;
    let userEnrolled = null;
    //To find no of students enrolled
    console.log("Enrol details");
    console.log(enrollmentDetails);
    User.findOne({
        SJSU_ID : req.body.data.sjsuID
    })
    .then(user => {
        
        console.log("User is");
        userEnrolled = user;
        console.log(userEnrolled.SJSU_ID);
        Course.findOne({
            COURSE_ID : req.body.data.courseId
        })
        .then(course => {
            let counter = 0;
            if(course.ENROLLED_COUNTER == '')
            {
                counter = 1;
            }
            else if(course.ENROLLED_COUNTER < course.COURSE_CAPACITY)
            {
                counter = parseInt(course.ENROLLED_COUNTER);
                console.log("COunter is --- ",counter);
                //counter++;
            }
            else
            {
                res.json({
                    message : "Course is full."
                })
            }
            
            course.ENROLLED_COUNTER = counter;
            console.log("counter is : ",counter + "...........", course.ENROLLED_COUNTER )
            course.save()
            .then(res =>
            {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
            courseEnrolled = course;
            console.log(courseEnrolled);

            const newEnrollment = new Enrollment({
                COURSE_ID : course,
                SJSU_ID : user,
                STATUS : "Enrolled"
            })
            console.log("++++++++++++++++++");
            console.log(newEnrollment);
            console.log("++++++++++++++++++");
            newEnrollment.save()
            .then(response => {
                console.log("Success");
                res.json({response})
            })
            .catch(error => {
                res.json({error});
            })
            
        })
        
    })

    

    
    // Enrollment.find({
    //     COURSE_ID : courseEnrolled
    // })
    // .then(enrollment => {
    //     console.log(enrollment.length + "...........................................");
    //     totalEnrollment = enrollment.length;
    //     courseModel.findOne({
    //         where: {
    //             COURSE_ID : req.body.data.courseId
    //         }
    //     })
    //     .then(course =>{
    //         console.log(course.COURSE_CAPACITY + "///////////////////////");
    //         courseCapacity = course.COURSE_CAPACITY;

    //         if(course.COURSE_CAPACITY > enrollment.length)
    //         {
    //             enrolModel.findOne({
    //                 where : {
    //                     COURSE_ID : req.body.data.courseId,
    //                     SJSU_ID : req.body.data.sjsuID
    //                 }
    //             })
    //             .then(enr => {
    //                 if(!enr)
    //                 {
    //                     enrolModel.create(enrollmentDetails)
    //                     .then(enrol => {
    //                         //console.log(enrol);
    //                         res.json({status : "Course '"+ enrol.COURSE_ID +"' added succesfully."});
            
    //                     })
    //                     .catch(error => {
    //                         res.send("Error : " + error)
    //                     })
                        
    //                 }
    //             })
    //             .catch(error => {
    //                 res.send("Something happened : " + error)
    //             })
    //         }
    //         else
    //         {
    //             res.json({status: "Course is full"});
    //         }
    //     })
    //     .catch(error => {
    //         console.log("No registration for this course");
    //     })
    // })
    // .catch(error => {
    //     console.log("No registration for this course");
    // })

        
    
})

enrollment.post('/courses/add', (req, res, next) => {

    Course.findOne({
        COURSE_ID : req.body.data.courseId
    }, (error, course) => {
        if(error)
        {
            console.log(error);
            return next(error);
        }
        if(!course)
        {
            res.json({
                message: "Course not found"
            })
        }
        console.log("Course : ")
        console.log(course);

        //If course is not full
        if(course.STUDENTS_ENROLLED.length < course.COURSE_CAPACITY)
        {
            //Get student details
            User.findOne({
                SJSU_ID : req.body.data.sjsuID
            }, (error, user) => {
                if(error)
                {
                    console.log(error);
                    return next(error);
                }
                if(!user)
                {
                    res.json({
                        message: "User not found"
                    })
                }
                console.log("User : ")
                console.log(user);

                //Add user to course and course to user.
                user.COURSES.push(course);
                course.STUDENTS_ENROLLED.push(user);
                
                //SAve
                course.save();
                user.save()
                .then(user => {
                    console.log("Course save");
                    User.findOne({
                        SJSU_ID: req.body.data.sjsuID
                    })
                    .populate('COURSES')
                    .exec((err, newUser) =>{
                        if(err) 
                            console.log(err);
                        else 
                            res.json({
                                user : newUser
                            }) 
                    });
                });
                
                // res.json({
                //     message : "Success"
                // })
            })
        }
        else
        {
            res.json({
                message : "Course is full"
            })
        }
    })
    
    // .then(course => {
    //     let counter = 0;
    //     if(course.ENROLLED_COUNTER == '')
    //     {
    //         counter = 1;
    //     }
    //     else if(course.ENROLLED_COUNTER < course.COURSE_CAPACITY)
    //     {
    //         counter = parseInt(course.ENROLLED_COUNTER);
    //         console.log("COunter is --- ",counter);
    //         //counter++;
            
    //     }
    //     else
    //     {
    //         res.json({
    //             message : "Course is full."
    //         })
    //     }
        
    //     course.ENROLLED_COUNTER = counter;
    //     console.log("counter is : ",counter + "...........", course.ENROLLED_COUNTER )
    //     course.save()
    //     .then(res =>
    //     {
    //         console.log(res);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
    //     courseEnrolled = course;
    //     console.log(courseEnrolled);

    //     const newEnrollment = new Enrollment({
    //         COURSE_ID : req.body.data.courseId,
    //         SJSU_ID : req.body.data.sjsuID,
    //         STATUS : "Enrolled"
    //     })
    //     console.log("++++++++++++++++++");
    //     console.log(newEnrollment);
    //     console.log("++++++++++++++++++");
    //     newEnrollment.save()
    //     .then(response => {
    //         console.log("Success");
    //         res.json({response})
    //     })
    //     .catch(error => {
    //         res.json({error});
    //     })
        
    // })

})

enrollment.post('/courses/delete', (req, res) => {

    console.log(req.body.data.courseId)
    const theUser = ''
    const theCOurse = ''
    Course.findOne({
        COURSE_ID: req.body.data.courseId
    })
    .then(course => {
        User.findOne({
            SJSU_ID: req.body.data.sjsuID
        })
        .then(user => {
            console.log("Yeah................................")
            console.log(user.COURSES.indexOf(course._id));
            user.COURSES.splice(user.COURSES.indexOf(course._id), 1);
            user.save();
            course.STUDENTS_ENROLLED.splice(course.STUDENTS_ENROLLED.indexOf(user._id), 1)
            course.save();
            // .then(newUser => {
                
            // })
        })
    })




})

//Remove student from enrolled list
enrollment.post('/removeStudent', (req, res) => {

    enrolModel.destroy({
        where :{
            SJSU_ID: req.body.data.sjsuID,
            COURSE_ID: req.body.data.courseId
        }
    })
    .then(response=>{
        res.json({response});
    })
    .catch(error => {
        console.log({error});
    })
})

enrollment.post('/getEnrolledCourses', (req,res) => {

    console.log(req.body.data);
    User.findOne({
        SJSU_ID: req.body.data.sjsuID
    })
    .populate('COURSES')
    .exec()
    .then(user => {
        if(user)
        {
            console.log("?????????????")
            console.log({user});  
            res.json({user});
        }
    })
})

module.exports = enrollment;