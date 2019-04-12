const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    TITLE: {
        type: String
    },
    TOTAL_POINTS: {
        type: String
    },
    FILE_PATH: {
        type: String,
    },
    DUE_DATE: {
        type: Date,
    },
    TIME_CREATED: {
        type: Date,
    }
})

const Assignment = mongoose.model('Assignment', AssignmentSchema);

module.exports = Assignment;