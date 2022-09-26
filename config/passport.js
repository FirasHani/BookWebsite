const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Load User model
const studentR = require('../models/USER');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'IDnumber' }, (IDnumber, password, done) => {
      // Match user
      studentR.findOne({
        IDnumber:IDnumber
        
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
        
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    studentR.findById(id, function(err, user) {
      done(err, user);
    });
  });
};