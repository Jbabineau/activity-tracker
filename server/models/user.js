const mongoose = require('mongoose'),
	  Schema = mongoose.Schema,
	  bcrypt = require('bcrypt-nodejs'),
	  config = require('../config/main');

//=================================================
// User Schema
//=================================================

const UserSchema = new Schema({
	email: {
		type: String, 
		lowercase: true,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profile: {
		firstName: {
			type: String
		},
		lastName: {
			type: String
		}
	},
	role: {
		type: String,
		enum: ['Member', 'Paid-Member', 'Admin']
		default: 'Member'
	},
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpires: {
		type: Date
	}
},
{
	timestamps: true
});

UserSchema.pre('save', function(next){
	const user = this,
		  SALT_FACTOR = config.databaseSalt;

	if(!user.isModified('password')) {
		return next();
	}

	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
		if(err) {
			return next(err);
		}

		bcrypt.has(user.password, salt, null, function(err, hash) {
			if(err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(condidatePassword, next) {
	bcrypt.compare(condidatePassword, this.password, function(err, isMatch) {
		if(err) {
			return next(err);
		}
		next(null, isMatch);
	});
}

module.exports = mongoose.model('User', UserSchema);