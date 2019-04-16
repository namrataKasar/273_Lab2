const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    FNAME: {
        type: String,
        required: true
    },
    LNAME: {
        type: String,
        required: true
    },
    SJSU_ID: {
        type: String,
        required: true
    },
    EMAIL: {
        type: String,
        required: true
    },
    PHONE_NO: {
        type: String
    },
    SCHOOL: {
        type: String
    },
    GENDER: {
        type: String
    },
    CITY: {
        type: String
    },
    COUNTRY: {
        type: String
    },
    HOMETOWN: {
        type: String
    },
    COMPANY: {
        type: String
    },
    LANGUAGE: {
        type: String
    },
    ABOUT_ME: {
        type: String
    },
    IS_STUDENT: {
        type: Boolean
    },
    PROFILE_PIC: {
        type: String
    },
    PASSWORD: {
        type: String,
        required: true            
    },
    COURSES: [
        { type: mongoose.Schema.ObjectId, ref: 'Course' }
    ],
    RECEIVED_MESSAGES:[
        {
            MESSAGE: String,
            Date: Date,
            FROM: String,
        }
    ],
    GRADES: [
        {
            COURSE_ID: String,
            NAME: String,
            SCORE: Number,
            OUT_OF: Number,
            DUE_DATE: Date,
            OUT_OF: Number,
        }
    ],
    SUBMISSIONS: [
        {
            AS_TITLE: String,
            COURSE_ID: String
        }
    ]
})

const User = mongoose.model('User', UserSchema);

module.exports = User;