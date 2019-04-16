var express = require('express');
var path = require('path');
var app = express();
const PORT = process.env.PORT || 3001;
var passport = require('passport');
require('./config/passport')(passport);

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var cors = require('cors');


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://52.9.213.58:3000', credentials: true }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://52.9.213.58:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

//Database connection starts
var mongoose = require('mongoose');
var db = require('./config/keys').mongoURL;

mongoose.connect(db, {useNewUrlParser : true})
.then(()=>{
    console.log("Mongo DB connected");
})
.catch((error) => {
    console.log(error);
})
//Database connection ends

// app.use(express.urlencoded({extended: true}))

//Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized:true
}))

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))
app.use(cookieParser());
//app.use(express.static(('./public')));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(function(err, req, res, next) {
    console.log(err);
});

//Routes
app.use('/', require('./routes/users')); 
app.use('/', require('./routes/courses'));  
app.use('/', require('./routes/enrollment')); 
app.use('/', require('./routes/announcement')); 
app.use('/', require('./routes/assignments')); 
app.use('/', require('./routes/quizzes')); 
app.use('/', require('./routes/messages')); 

module.exports = app;
app.listen(PORT, () => console.log('Listening on port 3001'));   