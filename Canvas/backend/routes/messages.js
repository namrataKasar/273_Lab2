var express = require('express');
var messages = express.Router();

var datetime = require('node-datetime');

const User = require('../models/User');

messages.post('/send/message', (req, res) => {

    var currentTime = datetime.create();
    var saveTime = new Date(currentTime.getTime());

    User.findOne({
        SJSU_ID: req.body.data.sendTo
    })
    .then(user => {
        const msg = {
            MESSAGE: req.body.data.message,
            Date: saveTime,
            FROM: req.body.data.fromName,
        }
        user.RECEIVED_MESSAGES.push(msg);
        user.save()
        .then(upUser => {
            res.json({user:upUser})
        })
        .catch(error => {
            res.json({error});
        })
    })

})



module.exports = messages;