const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    COURSE_ID: {
        type: mongoose.Schema.ObjectId, ref: 'Course'
    },
    TITLE: {
        type: String,
        required: true
    },
    DESCRIPTION: {
        type: String
    },
    POSTED_BY: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    POSTED_DATE: {
        type: Date
    }
})

const Announcement = mongoose.model('Announcement', AnnouncementSchema);

module.exports = Announcement;