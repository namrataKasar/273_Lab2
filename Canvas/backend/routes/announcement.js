var express = require('express');
var announcements = express.Router();
var cors = require('cors');

var datetime = require('node-datetime');


announcements.use(cors());
const Announcement = require('../models/Announcement');
const User = require('../models/User');
const Course = require('../models/Course');

announcements.post('/announcement/create', (req, res)=>{
    console.log("In Announcements");
    const data = req.body.data;
    var currentTime = datetime.create();
    console.log(new Date(currentTime.getTime()));
    var saveTime = new Date(currentTime.getTime());

    Course.findOne({
        COURSE_ID : data.courseId
    })
    .then(course => {
        const newAnnouncement = {
            TITLE : data.title, 
            DESCRIPTION : data.description,
            POSTED_DATE : saveTime,
        }

        course.ANNOUNCEMENTS.push(newAnnouncement);
        course.save()
        .then(response => {
            Course.findOne({
                COURSE_ID : data.courseId
            })
            .populate('CREATED_BY')
            .exec()
            .then(updatedCourse => {
                res.json({updatedCourse})
            })
            .catch(error => {
                console.log(error);
            })
        })
        .catch(error => {
            console.log(error);
        })
    })
    .catch(error => {
        console.log(error);
    })

    // console.log(req.body.data.title);
    // const announcementDetails = {
    //     COURSE_ID:req.body.data.courseId, 
    //     TITLE:req.body.data.title, 
    //     DESCRIPTION:req.body.data.description,
    //     TIMESTAMP:saveTime,
    //     POSTED_BY: req.body.data.sjsuID
    // };

    // console.log(req.body)
    // AnnouncementModel.findOne({
    //     where:{
    //         TITLE: req.body.data.title
    //     }
    // })
    // .then(announcement => {
    //     if(!announcement) {
    //         AnnouncementModel.create(announcementDetails)
    //         .then(announcement => {
    //             res.json({ sucessMessage : "Announcement is created at '" + announcement.TIMESTAMP + "' sucessfully"});
    //         })
    //         .catch(error => {
    //             res.send("Error : " + error);
    //         })
    //     }
    // })
    // .catch(error =>{
    //     res.json({error : "Title already exists"});
    // })

    
})

announcements.post('/getAnnouncements', (req, res) => {

    console.log("Announcemnets");
    console.log(req.body.data);
    Course.findOne({
        COURSE_ID : req.body.data.courseId
    })
    .populate('CREATED_BY')
    .exec()
    .then(course => {
        res.json({course})
    })
    .catch(error => {
        res.json(error);
    })
})

module.exports = announcements;