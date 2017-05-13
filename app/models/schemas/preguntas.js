var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Inscripcion = require('./inscripciones')
var preguntaSchema = new Schema({
	_id: {
		type: Number,
		require: true,
		default: 0
	},
	id_inscripcion:{
		type:Number,
		ref:'Inscripcion',
		require:true
	},
	pregunta:{
		type:String,
		require:true
	}
});


var Pregunta = mongoose.model('Pregunta',preguntaSchema);

module.exports = Pregunta;
