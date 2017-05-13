var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var personaSchema = new Schema({
	dni: {
		type: Number,
		require: true,
		unique:true
	},
	nombre:{
		type: String,
		require: true
	}
});


var Persona = mongoose.model('Persona',personaSchema);

module.exports = Persona;
