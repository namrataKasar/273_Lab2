// const LocalStrategy = require('passport-local').Strategy;
// var mongoose = require('mongoose');
// var bcryptjs = require('bcryptjs');

// const User = require('../models/User');

// module.exports = (passport) => {
//     passport.use( 'login',
//         new LocalStrategy( { usernameField : 'sjsuID'},
//             (sjsuID, password, done) => {
//                 User.findOne({ SJSU_ID : sjsuID})
//                 .then(user => {
//                     if(!user)
//                     {
//                         console.log("!user");
//                         return done(null, false, {message:"User does not exist"});
//                     }

//                     //Match password
//                     bcryptjs.compare(password, user.PASSWORD, 
//                         (error, isMatch) => {
//                             if(error)
//                             {
//                                 console.log(err);
//                                 res.sendStatus(500);
//                                 return;
//                             }
//                             if(isMatch)
//                             {
//                                 return done(null, user);
//                             }
//                             else
//                             {
//                                 return done(null, user, {message: "Password does not match"});
//                             }
//                         })
//                 })
//                 .catch(error => {
//                     console.log(error);
//                 })
//             } 
//         )
//     )

//     passport.serializeUser((user, done) => {
//         console.log("Serialize");
//         done(null, user.id);
//       });
      
//       passport.deserializeUser((id, done) => {
//         console.log("DESerialize");
//         User.findById(id, (err, user) => {
//           done(err, user);
//         });
//       });
// }

//For local jwt strategy
const jwtStrategy = require('passport-jwt').Strategy;
//To extract the jwt token
const ExtractJwt = require('passport-jwt').ExtractJwt;
//To compare the extracted data
const mongoose = require('mongoose');
const User = require('../models/User');
//get the keys to validate
const keys = require('./keys');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
        .then(user => {
            if(user){
                return done(null, user);
            }
            return done(null, false)
        })
        .catch(err => {
            console.log(err);
        })
    }))
}