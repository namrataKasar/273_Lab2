var app = require('../app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
var agent = require('chai').request.agent(app);


describe('Should have 9 courses', function(){
    it('/getAllUsers',function(){
        agent.get('/getAllUsers')
        .end(function (err, res) {
             expect(res).to.have.status(200);
        })
    });
})

describe('should login', function(){
    it('/login',function(){
        agent.post('/login').send({
            data: {
                sjsuID : "013007319",
            password : "admin",
            }
        }).end(function (err, res) {
            expect(res).to.have.status(200);
        })
    });
})


describe('Should send message', function(){
    it('/send/message',function(){
        agent.post('/send/message').send({
            data: {
                sendTo : "013007319",
                fromName : "Bhushan Patil",
                message : "Hello Namrata"
            }
        }).end(function (err, res) {
            expect(res).to.have.status(200);
        })
    });
})

describe('Should add course', function(){
    it('/courses/add',function(){
        agent.post('/courses/add').send({
           data : {
            courseId : "111",
            sjsuID : "013007319"
           }
        }).end(function (err, res) {
            expect(res).to.have.status(200);
        })
    });
})

describe('Should get all quizzes for course', function(){
    it('/getquizzes',function(){
        agent.post('/getquizzes').send({
           data : {
            courseId : "256",
           }
        }).end(function (err, res) {
            expect(res).to.have.status(200);
        })
    });
})