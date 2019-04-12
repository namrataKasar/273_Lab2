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

app.use(cors());

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