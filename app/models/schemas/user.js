var mongoose = require('mongoose'),
	 Schema = mongoose.Schema,
	 Persona = require('./personas')
var userSchema = new Schema({
	_id: {
		type: Number,
		require: true,
		default: 0
	},
	userName: {
		type:String,
		require:true
	},
	pwd: {
		type:String,
		require:true
	},
	dni: {
		ref:'Persona'
		type: Number,
		unique: true,
	}
});
var User = mongoose.model('User', userSchema);

module.exports = User;
