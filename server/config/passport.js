const passport = require('passport'),
	  User = require('../models/user'),
	  config = require('./main'),
	  JwtStrategy = require('passport-jwt').Startegy,
	  ExtractJwt = require('passport-jwt').ExtractJwt,
	  LocalStrategy = require('passport-local');

const localOptions = {
	usernameField = 'email'
};

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
	User.findOne({ email: email }, function(err, user) {
		if(err) {
			return done(err);
		}

		if(!user) {
			return done(null, false, { error: 'Your login details could not be verified. Please try again'});
		}

		user.comparePassword(password, function(err, isMatch) {
			if(err) {
				return done(err);
			}
			if(!isMatch) {
				return done(null, false, { error: 'Your login details could not be verified. Please try again'});
			}

			return done(null, user);
		});
	});
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// TODO: remove debug statement
	console.log(JSON.stringify(payload));
	User.findOne(payload._id, function(err, user) {
		if(err) {
			return done(err, false);
		}

		if(!user) {
			done(null, false);
		} else {
			done(null, user);
		}
	});
});

passport.use(jwtLogin);
passport.use(localLogin);